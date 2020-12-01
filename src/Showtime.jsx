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
    const [showtimeRef, isMounted, show, hide, status] = useShowtime({
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

    // If child is a function like (ref) => <Child ref={ref} />
    if (typeof children === "function") {
        return isMounted ? children(showtimeRef) : null;
    }

    // Otherwise it is a component <Child />, to which ref must be attached
    const child = Children.only(children);

    return isMounted
        ? cloneElement(child, {
              ref(node) {
                  showtimeRef.current = node;

                  // Attach existing refs on child, if any
                  const { ref } = child;
                  if (ref?.hasOwnProperty("current")) {
                      ref.current = node;
                  } else if (typeof ref === "function") {
                      ref(node);
                  }
              },
          })
        : null;
}
