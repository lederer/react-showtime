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
        console.error(`Expected ${n} to be a string or number.`);
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

function determineEffectiveSettings(settings) {
    const { transition: defaultTransition, ...defaults } = DEFAULTS;

    if (isString(settings)) {
        return { ...defaults, ...TRANSITIONS[settings] };
    }

    let { transition, ...rest } = settings;
    if (!transition) {
        transition = TRANSITIONS[defaultTransition];
    } else if (isString(transition)) {
        transition = TRANSITIONS[transition];
    }

    return { ...defaults, ...rest, ...transition };
}

function processSettings(settings = {}) {
    const {
        startHidden,
        hidden,
        beforeShow,
        afterShow,
        always,
        duration,
        delay,
        easing,
    } = determineEffectiveSettings(settings);

    const showTransitionCssText = extractTransitionCssText({
        duration,
        delay,
        easing,
        ...hidden,
        ...beforeShow,
    });
    const hideTransitionCssText = extractTransitionCssText({
        duration,
        delay,
        easing,
        ...hidden,
        ...afterShow,
    });
    const beforeShowCss = extractCssValues({ ...hidden, ...beforeShow });
    const afterShowCss = extractCssValues({ ...hidden, ...afterShow });
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
