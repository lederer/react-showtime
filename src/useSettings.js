import { useRef } from "react";
import { DEFAULTS, TRANSITIONS } from "./constants";

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

function resolveBeforeAfter(transitionParam) {
    const transition = { ...transitionParam };
    const { beforeShow, afterShow } = transition;

    if (isString(beforeShow)) {
        transition.beforeShow = {
            ...TRANSITIONS[beforeShow].hidden,
            ...TRANSITIONS[beforeShow].beforeShow,
        };
    } else if (beforeShow && isString(beforeShow.transition)) {
        const { duration, delay, easing } = beforeShow;
        transition.beforeShow = {
            ...TRANSITIONS[beforeShow.transition].hidden,
            ...TRANSITIONS[beforeShow.transition].beforeShow,
            duration,
            delay,
            easing,
        };
    }

    if (isString(afterShow)) {
        transition.afterShow = {
            ...TRANSITIONS[afterShow].hidden,
            ...TRANSITIONS[afterShow].beforeShow,
        };
    } else if (afterShow && isString(afterShow.transition)) {
        const { duration, delay, easing } = afterShow;
        transition.afterShow = {
            ...TRANSITIONS[afterShow.transition].hidden,
            ...TRANSITIONS[afterShow.transition].afterShow,
            duration,
            delay,
            easing,
        };
    }

    transition.beforeShow = { ...transition.hidden, ...transition.beforeShow };
    transition.afterShow = { ...transition.hidden, ...transition.afterShow };

    return transition;
}

function resolveEffectiveSettings(settingsParam) {
    const { transition: defaultTransition, ...defaults } = DEFAULTS;

    let settings;
    if (isString(settingsParam)) {
        settings = { transition: TRANSITIONS[settingsParam] };
    } else {
        settings = settingsParam;
    }

    let { transition, ...rest } = settings;
    if (!transition) {
        transition = { ...TRANSITIONS[defaultTransition] };
    } else if (isString(transition)) {
        transition = { ...TRANSITIONS[transition] };
    }

    transition = resolveBeforeAfter(transition);

    return { ...defaults, ...rest, ...transition };
}

function processSettings(settings = {}) {
    const {
        startHidden,
        beforeShow,
        afterShow,
        always,
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
    const afterShowCss = extractCssValues(afterShow);
    const alwaysCss = extractCssValues(always);

    return {
        startHidden,
        beforeShowCss,
        afterShowCss,
        alwaysCss,
        showTransitionCssText,
        hideTransitionCssText,
    };
}

export default function useSettings(settings) {
    const settingsRef = useRef();
    settingsRef.current = settingsRef.current || processSettings(settings);
    return settingsRef.current;
}
