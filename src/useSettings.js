import { useRef } from "react";
import { DEFAULTS } from "./constants";
import { PRESETS } from "./presets";

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
    const { beforeShow, afterShow } = transition;

    if (isString(beforeShow)) {
        transition.beforeShow = {
            ...PRESETS[beforeShow].hidden,
            ...PRESETS[beforeShow].beforeShow,
        };
    } else if (beforeShow && isString(beforeShow.transition)) {
        const { duration, delay, easing } = beforeShow;
        transition.beforeShow = {
            ...PRESETS[beforeShow.transition].hidden,
            ...PRESETS[beforeShow.transition].beforeShow,
            duration,
            delay,
            easing,
        };
    }

    if (isString(afterShow)) {
        transition.afterShow = {
            ...PRESETS[afterShow].hidden,
            ...PRESETS[afterShow].beforeShow,
        };
    } else if (afterShow && isString(afterShow.transition)) {
        const { duration, delay, easing } = afterShow;
        transition.afterShow = {
            ...PRESETS[afterShow.transition].hidden,
            ...PRESETS[afterShow.transition].afterShow,
            duration,
            delay,
            easing,
        };
    }

    const [beforeShowInstant, beforeShowRest] = extractInstantProperties({
        ...transition.hidden,
        ...transition.beforeShow,
    });
    transition.beforeShowInstant = beforeShowInstant;
    transition.beforeShow = beforeShowRest;

    const [afterShowInstant, afterShowRest] = extractInstantProperties({
        ...transition.hidden,
        ...transition.afterShow,
    });
    transition.afterShowInstant = afterShowInstant;
    transition.afterShow = afterShowRest;

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
        beforeShow,
        afterShow,
        beforeShowInstant,
        afterShowInstant,
        duration,
        delay,
        easing,
    } = resolveEffectiveSettings(settings);

    const showTransitionCssText = extractTransitionCssText({
        duration,
        delay,
        easing,
        ...beforeShow,
    });
    const hideTransitionCssText = extractTransitionCssText({
        duration,
        delay,
        easing,
        ...afterShow,
    });

    const beforeShowCss = extractCssValues(beforeShow);
    const beforeShowInstantCss = extractCssValues(beforeShowInstant);

    const afterShowCss = extractCssValues(afterShow);
    const afterShowInstantCss = extractCssValues(afterShowInstant);

    return {
        startHidden,
        beforeShowCss,
        beforeShowInstantCss,
        afterShowCss,
        afterShowInstantCss,
        showTransitionCssText,
        hideTransitionCssText,
    };
}

export default function useSettings(settings) {
    const settingsRef = useRef();
    settingsRef.current = settingsRef.current || processSettings(settings);
    return settingsRef.current;
}
