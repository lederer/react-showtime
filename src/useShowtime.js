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
        startWithTransition,
        hiddenBeforeCss,
        hiddenBeforeInstantCss,
        hiddenAfterCss,
        hiddenAfterInstantCss,
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
                    addInlineStyles(
                        elementRef.current,
                        nullifyStyles(hiddenBeforeInstantCss)
                    );
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
            if (!startHidden && !startWithTransition) {
                return;
            }
        }

        addInlineStyles(elementRef.current, hiddenBeforeInstantCss);
        setStatus(STATUS.transitioningIn);
    }, [isMounted, startHidden, startWithTransition, hiddenBeforeInstantCss]);

    useLayoutEffect(() => {
        if (status === STATUS.transitioningIn) {
            addInlineStyles(elementRef.current, hiddenBeforeInstantCss);
            dimensionsRef.current = getComputedDimensions(elementRef.current);
            addInlineStyles(elementRef.current, hiddenBeforeCss);
        } else if (status === STATUS.transitioningOut) {
            addInlineStyles(elementRef.current, hiddenAfterInstantCss);
            const dimensions = getComputedDimensions(elementRef.current);
            addInlineStyles(elementRef.current, dimensions);
        }
    }, [
        status,
        hiddenBeforeInstantCss,
        hiddenBeforeCss,
        hiddenAfterInstantCss,
    ]);

    useEffect(() => {
        if (status === STATUS.transitioningIn) {
            const showCss = {
                ...nullifyStyles(hiddenBeforeCss),
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
                    addInlineStyles(elementRef.current, hiddenAfterCss);
                });
            });
        }
    }, [
        status,
        hiddenBeforeCss,
        hiddenAfterCss,
        showTransitionCssText,
        hideTransitionCssText,
    ]);

    const ret = [elementRef, isMounted, show, hide, status];

    ret.ref = elementRef;
    ret.isMounted = isMounted;
    ret.show = show;
    ret.hide = hide;
    ret.status = status;

    return ret;
}
