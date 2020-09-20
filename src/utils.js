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

export function addInlineStyles(element, styles) {
    for (const style in styles) {
        element.style.setProperty(style, styles[style]);
    }
}

export function getInlineStyles(element) {
    const styles = {};
    for (const prop in element.style) {
        if (element.style.hasOwnProperty(prop) && element.style[prop]) {
            styles[prop] = element.style[prop];
        }
    }
    return styles;
}

export function nullifyStyles(styles) {
    const nullifiedStyles = { ...styles };
    for (const style in nullifiedStyles) {
        nullifiedStyles[style] = null;
    }
    return nullifiedStyles;
}
