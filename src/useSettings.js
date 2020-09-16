import { useRef } from "react";
import { DEFAULTS } from "./constants";
import PRESETS from "./presets";

function toKebabCase(str) {
    return str
        .match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map((x) => x.toLowerCase())
        .join("-");
}

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

function extractTransitionCssText({
    duration = DEFAULTS.duration,
    delay = DEFAULTS.delay,
    easing: commonEasing = DEFAULTS.easing,
    transition, // ignore if present
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

function extractCssValues({
    duration,
    delay,
    easing,
    transition, // ignore if present
    ...rest
} = {}) {
    const values = {};
    for (const property in rest) {
        values[property] = rest[property].value ?? rest[property];
    }
    return values;
}

function extractInstantProperties(cssObject) {
    // If there are any zero-duration, zero-delay properties in before/after,
    // they'll need to be applied early to take affect.
    // eg, `transformOrigin: top` in "scale".

    const pre = {},
        rest = {};
    for (const property in cssObject) {
        const value = cssObject[property];
        if (hasZeroDurationAndDelay(value)) {
            pre[property] = value;
        } else {
            rest[property] = value;
        }
    }
    return [pre, rest];
}

function resolveBeforeAfter(transitionParam) {
    const transition = { ...transitionParam };
    const { hiddenBefore, hiddenAfter } = transition;

    if (isString(hiddenBefore)) {
        transition.hiddenBefore = {
            ...PRESETS[hiddenBefore].hidden,
            ...PRESETS[hiddenBefore].hiddenBefore,
        };
    } else if (hiddenBefore && isString(hiddenBefore.transition)) {
        const { duration, delay, easing } = hiddenBefore;
        transition.hiddenBefore = {
            ...PRESETS[hiddenBefore.transition].hidden,
            ...PRESETS[hiddenBefore.transition].hiddenBefore,
            duration,
            delay,
            easing,
        };
    }

    if (isString(hiddenAfter)) {
        transition.hiddenAfter = {
            ...PRESETS[hiddenAfter].hidden,
            ...PRESETS[hiddenAfter].hiddenBefore,
        };
    } else if (hiddenAfter && isString(hiddenAfter.transition)) {
        const { duration, delay, easing } = hiddenAfter;
        transition.hiddenAfter = {
            ...PRESETS[hiddenAfter.transition].hidden,
            ...PRESETS[hiddenAfter.transition].hiddenAfter,
            duration,
            delay,
            easing,
        };
    }

    const [hiddenBeforeInstant, hiddenBeforeRest] = extractInstantProperties({
        ...transition.hidden,
        ...transition.hiddenBefore,
    });
    transition.hiddenBeforeInstant = hiddenBeforeInstant;
    transition.hiddenBefore = hiddenBeforeRest;

    const [hiddenAfterInstant, hiddenAfterRest] = extractInstantProperties({
        ...transition.hidden,
        ...transition.hiddenAfter,
    });
    transition.hiddenAfterInstant = hiddenAfterInstant;
    transition.hiddenAfter = hiddenAfterRest;

    return transition;
}

function resolveEffectiveSettings(settingsParam) {
    const { transition: defaultTransition, ...defaults } = DEFAULTS;

    let settings;
    if (isString(settingsParam)) {
        settings = { transition: PRESETS[settingsParam] };
    } else {
        settings = settingsParam;
    }

    let { transition, ...rest } = settings;
    if (!transition) {
        transition = { ...PRESETS[defaultTransition] };
    } else if (isString(transition)) {
        transition = { ...PRESETS[transition] };
    }

    transition = resolveBeforeAfter(transition);

    return { ...defaults, ...rest, ...transition };
}

function processSettings(settings = {}) {
    const {
        startHidden,
        hiddenBefore,
        hiddenAfter,
        hiddenBeforeInstant,
        hiddenAfterInstant,
        duration,
        delay,
        easing,
    } = resolveEffectiveSettings(settings);

    const showTransitionCssText = extractTransitionCssText({
        duration,
        delay,
        easing,
        ...hiddenBefore,
    });
    const hideTransitionCssText = extractTransitionCssText({
        duration,
        delay,
        easing,
        ...hiddenAfter,
    });

    const hiddenBeforeCss = extractCssValues(hiddenBefore);
    const hiddenBeforeInstantCss = extractCssValues(hiddenBeforeInstant);

    const hiddenAfterCss = extractCssValues(hiddenAfter);
    const hiddenAfterInstantCss = extractCssValues(hiddenAfterInstant);

    return {
        startHidden,
        hiddenBeforeCss,
        hiddenBeforeInstantCss,
        hiddenAfterCss,
        hiddenAfterInstantCss,
        showTransitionCssText,
        hideTransitionCssText,
    };
}

export default function useSettings(settings) {
    const settingsRef = useRef();
    settingsRef.current = settingsRef.current || processSettings(settings);
    return settingsRef.current;
}
