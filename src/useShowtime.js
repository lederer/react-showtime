import { useRef, useState, useLayoutEffect, useEffect } from "react";
import useSettings from "./useSettings";
import useEventListener from "./useEventListener";
import { STATUS } from "./constants";
import {
    getComputedDimensions,
    addInlineStyles,
    getInlineStyles,
    nullifyStyles,
} from "./utils";

export default function useShowtime(settings) {
    const {
        startHidden,
        startWithTransition,
        showTransition,
        hideTransition,
    } = useSettings(settings);

    const elementRef = useRef();
    const dimensionsRef = useRef();
    const inlineShowingCssRef = useRef();
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
            if (status === STATUS.hideTransition) {
                setIsMounted(false);
                setStatus(STATUS.hidden);
            } else if (status === STATUS.showTransition) {
                elementRef.current.style.transition = null;
                animationFrameRequestRef.current = requestAnimationFrame(() => {
                    if (!elementRef.current) {
                        return;
                    }
                    const showingCss = {
                        height: null,
                        width: null,
                        ...nullifyStyles(hideTransition.instantStyles),
                        ...inlineShowingCssRef.current,
                    };
                    addInlineStyles(elementRef.current, showingCss);
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
        setStatus(STATUS.hideTransition);
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

        inlineShowingCssRef.current = getInlineStyles(elementRef.current);
        addInlineStyles(elementRef.current, showTransition.instantStyles);
        setStatus(STATUS.showTransition);
    }, [isMounted, startHidden, startWithTransition, showTransition]);

    useLayoutEffect(() => {
        if (status === STATUS.showTransition) {
            dimensionsRef.current = getComputedDimensions(elementRef.current);
            addInlineStyles(elementRef.current, showTransition.styles);
        } else if (status === STATUS.hideTransition) {
            addInlineStyles(elementRef.current, hideTransition.instantStyles);
            const dimensions = getComputedDimensions(elementRef.current);
            addInlineStyles(elementRef.current, dimensions);
        }
    }, [status, showTransition, hideTransition]);

    useEffect(() => {
        if (status === STATUS.showTransition) {
            const showCss = {
                ...nullifyStyles(showTransition.styles),
                ...inlineShowingCssRef.current,
                ...dimensionsRef.current,
            };

            // For some reason, this delay avoids a Firefox issue where
            // some transition properties (eg, opacity) start with their
            // showing value instead of hidden, so the transition is abrupt.
            // requestAnimationFrame() doesn't suffice, so must use setTimeout().
            setTimeout(() => {
                if (!elementRef.current) {
                    return;
                }
                elementRef.current.style.transition =
                    showTransition.cssTransitionProperty;
                animationFrameRequestRef.current = requestAnimationFrame(() => {
                    elementRef.current &&
                        addInlineStyles(elementRef.current, showCss);
                });
            }, 32);
        } else if (status === STATUS.hideTransition) {
            animationFrameRequestRef.current = requestAnimationFrame(() => {
                if (!elementRef.current) {
                    return;
                }
                elementRef.current.style.transition =
                    hideTransition.cssTransitionProperty;
                animationFrameRequestRef.current = requestAnimationFrame(() => {
                    elementRef.current &&
                        addInlineStyles(
                            elementRef.current,
                            hideTransition.styles
                        );
                });
            });
        }
    }, [status, hideTransition, showTransition]);

    const ret = [elementRef, isMounted, show, hide, status];

    ret.ref = elementRef;
    ret.isMounted = isMounted;
    ret.show = show;
    ret.hide = hide;
    ret.status = status;

    return ret;
}
