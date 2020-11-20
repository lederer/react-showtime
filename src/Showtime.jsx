import { Children, cloneElement, useRef, useEffect, useState } from "react";
import useShowtime from "./useShowtime";
import { STATUS } from "./constants";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export default function Showtime({
    show: shouldShow = true,
    onHidden,
    onShowing,
    children,
    ...props
}) {
    const [ref, isMounted, show, hide, status] = useShowtime({
        startHidden: !shouldShow,
        ...props,
    });

    const wasShowing = usePrevious(shouldShow);
    useEffect(() => {
        if (shouldShow === undefined) {
            return;
        }

        if (wasShowing && !shouldShow) {
            setNextTransition("hide");
        } else if (!wasShowing && shouldShow) {
            setNextTransition("show");
        }
    }, [shouldShow, wasShowing]);

    const [nextTransition, setNextTransition] = useState();
    useEffect(() => {
        if (!nextTransition) {
            return;
        }

        if (status === STATUS.hidden && nextTransition === "show") {
            setNextTransition(null);
            show();
            return;
        }

        if (status === STATUS.showing && nextTransition === "hide") {
            setNextTransition(null);
            hide();
            return;
        }
    }, [status, nextTransition, hide, show]);

    const previousStatus = usePrevious(status);
    useEffect(() => {
        if (previousStatus === undefined) {
            return;
        }

        if (previousStatus !== STATUS.hidden && status === STATUS.hidden) {
            onHidden && onHidden();
        } else if (
            previousStatus !== STATUS.showing &&
            status === STATUS.showing
        ) {
            onShowing && onShowing();
        }
    }, [status, previousStatus, onHidden, onShowing]);

    return isMounted ? cloneElement(Children.only(children), { ref }) : null;
}
