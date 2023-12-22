import { useRef, useState, useLayoutEffect } from "react";
import FontFaceObserver from "fontfaceobserver";

function useFontFaceObserver(name, options) {
    const [isLoaded, setIsLoaded] = useState(false);
    const nameRef = useRef(name);
    const optionsRef = useRef(options);

    useLayoutEffect(() => {
        const font = new FontFaceObserver(nameRef.current, optionsRef.current);
        font.load()
            .then(() => setIsLoaded(true))
            .catch(() => setIsLoaded(true)); // on fail, trigger anyway, to use backup font
    }, []);

    return isLoaded;
}

export default useFontFaceObserver;
