function trimPx(str) {
    return str.replace("px", "");
}

export function getComputedDimensions(el) {
    // Can't transition from height/width: auto
    // so determine them and declare them in css explicitly.

    let height = el.offsetHeight;
    let width = el.offsetWidth;

    if (window.getComputedStyle(el).boxSizing === "content-box") {
        const {
            paddingTop,
            paddingBottom,
            paddingRight,
            paddingLeft,
            borderTopWidth,
            borderBottomWidth,
            borderRightWidth,
            borderLeftWidth,
        } = window.getComputedStyle(el);

        height =
            height -
            trimPx(paddingTop) -
            trimPx(paddingBottom) -
            trimPx(borderTopWidth) -
            trimPx(borderBottomWidth);

        width =
            width -
            trimPx(paddingRight) -
            trimPx(paddingLeft) -
            trimPx(borderRightWidth) -
            trimPx(borderLeftWidth);
    }

    return {
        height: `${height}px`,
        width: `${width}px`,
    };
}

export function restoreDimensions(el) {
    el.style.height = null;
    el.style.width = null;
}

export function addInlineStyles(element, styles) {
    for (const style in styles) {
        element.style[style] = styles[style];
    }
}

export function nullifyStyles(styles) {
    const nullifiedStyles = { ...styles };
    for (const style in nullifiedStyles) {
        nullifiedStyles[style] = null;
    }
    return nullifiedStyles;
}
