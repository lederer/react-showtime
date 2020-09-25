import { useRef } from "react";
import { DEFAULTS } from "./constants";
import { toKebabCase } from "./utils";
import TRANSITIONS from "./transitions";

function isString(s) {
    return typeof s === "string" || s instanceof String;
}

function isObject(o) {
    return typeof o === "object" && o !== null;
}

function hasZeroDurationAndDelay(cssPropertyObject) {
    if (!isObject(cssPropertyObject)) {
        return false;
    }

    const { duration, delay } = cssPropertyObject;

    if (!isZeroCssValue(duration)) {
        return false;
    }

    if (delay !== null && delay !== undefined && !isZeroCssValue(delay)) {
        return false;
    }

    return true;
}

function stringifyCssTransitionNumber(n) {
    if (isString(n)) {
        return n;
    }
    if (Number.isInteger(n)) {
        return `${n}ms`;
    }
    if (Number.isNaN(n)) {
        //  Expected string or number
        return;
    }

    // Must be a float, then.
    return `${n}s`;
}

function isZeroCssValue(v) {
    if (v === 0) {
        return true;
    }
    if (isString(v) && v.charAt(0) === "0") {
        return true;
    }
    return false;
}

function extractCssTransitionProperty({
    duration,
    delay,
    easing: commonEasing,
    ...rest
}) {
    const commonDuration = stringifyCssTransitionNumber(duration);
    const commonDelay = stringifyCssTransitionNumber(delay);

    const transitionStrings = [];
    for (const property in rest) {
        const kebabName = toKebabCase(property);
        if (isString(rest[property])) {
            transitionStrings.push(
                `${kebabName} ${commonDuration} ${commonEasing} ${commonDelay}`
            );
        } else {
            let {
                duration: specificDuration = commonDuration,
                delay: specificDelay = commonDelay,
                easing: specificEasing = commonEasing,
            } = rest[property];
            if (
                !isZeroCssValue(specificDuration) ||
                !isZeroCssValue(specificDelay)
            ) {
                specificDuration = stringifyCssTransitionNumber(
                    specificDuration
                );
                specificDelay = stringifyCssTransitionNumber(specificDelay);
                transitionStrings.push(
                    `${kebabName} ${specificDuration} ${specificEasing} ${specificDelay}`
                );
            }
        }
    }

    return transitionStrings.join(", ");
}

function extractCssValues(properties = {}) {
    const values = {};
    for (const property in properties) {
        values[property] = properties[property].value ?? properties[property];
    }
    return values;
}

function extractStyles(cssObject) {
    // If there are any zero-duration, zero-delay properties in before/after,
    // they'll need to be applied early to take affect.

    let instantStyles = {},
        styles = {};
    for (const property in cssObject) {
        const value = cssObject[property];
        if (hasZeroDurationAndDelay(value)) {
            instantStyles[property] = value;
        } else {
            styles[property] = value;
        }
    }

    instantStyles = extractCssValues(instantStyles);
    styles = extractCssValues(styles);

    return { instantStyles, styles };
}

function resolveTransitionObject(transition, duration, delay, easing) {
    const { styles, instantStyles } = extractStyles(transition);
    const cssTransitionProperty = extractCssTransitionProperty({
        duration,
        delay,
        easing,
        ...transition,
    });

    return { styles, instantStyles, cssTransitionProperty };
}

function resolveShowHideTransitions(settings) {
    const { duration, delay, easing, transition } = settings;
    let {
        showDuration,
        showDelay,
        showEasing,
        hideDuration,
        hideDelay,
        hideEasing,
    } = settings;

    let showTransition = settings.showTransition || transition;

    if (isString(showTransition)) {
        showDuration =
            showDuration ||
            TRANSITIONS[showTransition].showDuration ||
            TRANSITIONS[showTransition].duration ||
            duration;
        showDelay =
            showDelay ||
            TRANSITIONS[showTransition].showDelay ||
            TRANSITIONS[showTransition].delay ||
            delay;
        showEasing =
            showEasing ||
            TRANSITIONS[showTransition].showEasing ||
            TRANSITIONS[showTransition].easing ||
            easing;
        showTransition =
            TRANSITIONS[showTransition].showTransition ||
            TRANSITIONS[showTransition].transition;
    }

    showTransition = resolveTransitionObject(
        showTransition,
        showDuration || duration,
        showDelay || delay,
        showEasing || easing
    );

    let hideTransition = settings.hideTransition || transition;

    if (isString(hideTransition)) {
        hideDuration =
            settings.hideDuration ||
            TRANSITIONS[hideTransition].hideDuration ||
            TRANSITIONS[hideTransition].duration ||
            settings.duration;
        hideDelay =
            settings.hideDelay ||
            TRANSITIONS[hideTransition].hideDelay ||
            TRANSITIONS[hideTransition].delay ||
            settings.delay;
        hideEasing =
            settings.hideEasing ||
            TRANSITIONS[hideTransition].hideEasing ||
            TRANSITIONS[hideTransition].easing ||
            settings.easing;
        hideTransition =
            TRANSITIONS[hideTransition].hideTransition ||
            TRANSITIONS[hideTransition].transition;
    }

    hideTransition = resolveTransitionObject(
        hideTransition,
        hideDuration || duration,
        hideDelay || delay,
        hideEasing || easing
    );

    return { showTransition, hideTransition };
}

function mergeWithDefaults(settings) {
    const { transition: defaultTransition, ...defaults } = DEFAULTS;

    if (!settings) {
        return { ...defaults, ...TRANSITIONS[defaultTransition] };
    } else if (isString(settings)) {
        return { ...defaults, ...TRANSITIONS[settings] };
    } else if (!isObject(settings)) {
        throw new Error("Invalid settings");
    } else if (
        !settings.transition &&
        !settings.showTransition &&
        !settings.hideTransition
    ) {
        return {
            ...defaults,
            ...TRANSITIONS[defaultTransition],
            ...settings,
        };
    } else {
        return { ...defaults, ...settings };
    }
}

function processSettings(settings = {}) {
    const {
        startHidden,
        startWithTransition,
        ...transitionSettings
    } = mergeWithDefaults(settings);

    const { showTransition, hideTransition } = resolveShowHideTransitions(
        transitionSettings
    );

    return {
        startHidden,
        startWithTransition,
        showTransition,
        hideTransition,
    };
}

export default function useSettings(settings) {
    const settingsRef = useRef();
    settingsRef.current = settingsRef.current || processSettings(settings);
    return settingsRef.current;
}
