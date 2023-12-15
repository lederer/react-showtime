import { useRef, useReducer, useLayoutEffect, useEffect } from "react";
import useSettings from "./useSettings";
import useEventListener from "./useEventListener";
import { STATUS } from "./constants";
import {
    getComputedDimensions,
    addInlineStyles,
    getInlineStyles,
    nullifyStyles,
} from "./utils";

function transitionReducer(state, action) {
    switch (action.type) {
        case "mount":
            return { ...state, isMounted: true };
        case "show":
            return { ...state, status: STATUS.showTransition };
        case "hide":
            return { ...state, status: STATUS.hideTransition };
        case "hidden":
            return { ...state, isMounted: false, status: STATUS.hidden };
        case "showing":
            return { ...state, status: STATUS.showing };
        default:
            throw new Error("Invalid action type");
    }
}

export default function useShowtime(settings) {
    const { startHidden, startWithTransition, showTransition, hideTransition } =
        useSettings(settings);

    const [state, dispatch] = useReducer(transitionReducer, {
        isMounted: !startHidden,
        status: startHidden
            ? STATUS.hidden
            : startWithTransition
            ? STATUS.showTransition
            : STATUS.showing,
    });
    const { isMounted, status } = state;

    const elementRef = useRef();
    const dimensionsRef = useRef();
    const inlineShowingCssRef = useRef();
    const eventSetRef = useRef();

    const animationFrameRequestRef = useRef();
    useEffect(() => {
        return () => cancelAnimationFrame(animationFrameRequestRef.current);
    }, []);

    const handleTransitionRun = (e) => {
        if (e.target !== elementRef.current) {
            return;
        }
        eventSetRef.current = eventSetRef.current || new Set();
        eventSetRef.current.add(e.propertyName);
    };

    const handleTransitionEnd = (e) => {
        if (e.target !== elementRef.current) {
            return;
        }

        eventSetRef.current?.delete(e.propertyName);

        if (!eventSetRef.current?.size) {
            if (status === STATUS.hideTransition) {
                dispatch({ type: "hidden" });
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
                    dispatch({ type: "showing" });
                });
            }
        }
    };

    useEventListener("transitionrun", handleTransitionRun, elementRef.current);
    useEventListener("transitionend", handleTransitionEnd, elementRef.current);

    const show = () => {
        if (!isMounted && status === STATUS.hidden) {
            dispatch({ type: "mount" });
        }
    };

    const hide = () => {
        if (isMounted && status === STATUS.showing) {
            dispatch({ type: "hide" });
        }
    };

    useLayoutEffect(() => {
        if (isMounted && status === STATUS.hidden) {
            dispatch({ type: "show" });
        }
    }, [isMounted, status]);

    useLayoutEffect(() => {
        if (status === STATUS.showTransition) {
            inlineShowingCssRef.current = getInlineStyles(elementRef.current);
            addInlineStyles(elementRef.current, showTransition.instantStyles);
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
