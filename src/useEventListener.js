import { useEffect, useRef } from "react";

// via https://usehooks.com/useEventListener/
export default function useEventListener(eventName, handler, element = window) {
    // This allows the effect below to always get latest handler ...
    // ... without needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    const savedHandler = useRef();
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event) => savedHandler.current(event);

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}
