import { useRef, useState, useLayoutEffect, useEffect } from "react";
import useSettings from "./useSettings";
import useEventListener from "./useEventListener";
import { STATUS } from "./constants";
import {
    getComputedDimensions,
    restoreDimensions,
    addInlineStyles,
    nullifyStyles,
} from "./utils";

export default function useShowtime(settings) {
    const {
        startHidden,
        beforeShowCss,
        afterShowCss,
        alwaysCss,
        showTransitionCssText,
        hideTransitionCssText,
    } = useSettings(settings);

    const elementRef = useRef();
    const dimensionsRef = useRef();
    const isInitialRenderRef = useRef(true);
    const eventSetRef = useRef();

    const [status, setStatus] = useState(
        startHidden ? STATUS.hidden : STATUS.showing
    );

    const [isMounted, setIsMounted] = useState(!startHidden);

    const animationFrameRequestRef = useRef();
    useEffect(() => {
        return () => cancelAnimationFrame(animationFrameRequestRef.current);
    }, []);

    const handleTransitionRun = (e) => {
        eventSetRef.current = eventSetRef.current || new Set();
        eventSetRef.current.add(e.propertyName);
    };

    const handleTransitionEnd = (e) => {
        eventSetRef.current.delete(e.propertyName);

        if (!eventSetRef.current.size) {
            if (status === STATUS.transitioningOut) {
                setIsMounted(false);
                setStatus(STATUS.hidden);
            } else if (status === STATUS.transitioningIn) {
                elementRef.current.style.transition = null;
                animationFrameRequestRef.current = requestAnimationFrame(() => {
                    restoreDimensions(elementRef.current);
                    setStatus(STATUS.showing);
                });
            }
        }
    };

    const handleTransitionCancel = (e) => {
        eventSetRef.current.delete(e.propertyName);
    };

    useEventListener("transitionrun", handleTransitionRun, elementRef.current);
    useEventListener("transitionend", handleTransitionEnd, elementRef.current);
    useEventListener(
        "transitioncancel",
        handleTransitionCancel,
        elementRef.current
    );

    const show = () => {
        if (status !== STATUS.hidden) {
            return;
        }
        if (isMounted) {
            return;
        }
        setIsMounted(true);
    };

    const hide = () => {
        if (status !== STATUS.showing) {
            return;
        }
        if (!isMounted) {
            return;
        }
        setStatus(STATUS.transitioningOut);
    };

    useLayoutEffect(() => {
        if (!isMounted) {
            return;
        }

        if (isInitialRenderRef.current) {
            isInitialRenderRef.current = false;
            if (!startHidden) {
                // alwaysCss will get added on each show transition,
                // but needs to be added here for initial non-transitioned show
                addInlineStyles(elementRef.current, alwaysCss);
                return;
            }
        }

        setStatus(STATUS.transitioningIn);
    }, [isMounted, startHidden, alwaysCss]);

    useLayoutEffect(() => {
        if (status === STATUS.transitioningIn) {
            addInlineStyles(elementRef.current, alwaysCss);
            dimensionsRef.current = getComputedDimensions(elementRef.current);
            addInlineStyles(elementRef.current, beforeShowCss);
        } else if (status === STATUS.transitioningOut) {
            const dimensions = getComputedDimensions(elementRef.current);
            addInlineStyles(elementRef.current, dimensions);
        }
    }, [status, alwaysCss, beforeShowCss]);

    useEffect(() => {
        if (status === STATUS.transitioningIn) {
            const showCss = {
                ...nullifyStyles(beforeShowCss),
                ...dimensionsRef.current,
            };

            // For some reason, this delay avoids a Firefox issue where
            // some transition properties (eg, opacity) start with their
            // showing value instead of hidden, so the transition is abrupt.
            // requestAnimationFrame() doesn't suffice, so must use setTimeout().
            setTimeout(() => {
                elementRef.current.style.transition = showTransitionCssText;
                animationFrameRequestRef.current = requestAnimationFrame(() => {
                    addInlineStyles(elementRef.current, showCss);
                });
            }, 32);
        } else if (status === STATUS.transitioningOut) {
            animationFrameRequestRef.current = requestAnimationFrame(() => {
                elementRef.current.style.transition = hideTransitionCssText;
                animationFrameRequestRef.current = requestAnimationFrame(() => {
                    addInlineStyles(elementRef.current, afterShowCss);
                });
            });
        }
    }, [
        status,
        beforeShowCss,
        afterShowCss,
        showTransitionCssText,
        hideTransitionCssText,
    ]);

    const ret = [isMounted, elementRef, show, hide, status];

    ret.isMounted = isMounted;
    ret.ref = elementRef;
    ret.show = show;
    ret.hide = hide;
    ret.status = status;

    return ret;
}
