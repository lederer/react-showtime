import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const showDuration = "4s";
const showDelay = stringifyCssTransitionNumber(50);
const showEasing = "cubic-bezier(0.16, 2.04, 0.41, 1.67)";

const hideDuration = "300ms";
const hideDelay = stringifyCssTransitionNumber(DEFAULTS.delay);
const hideEasing = "cubic-bezier(0, -0.4, 0.54, -0.34)";

const name =
    "kitchen sink including initial state booleans and per-property timing";

const input = {
    startHidden: true,
    startWithTransition: true,
    showTransition: {
        transform: "translateY(-200%)",
        background: {
            value: "red",
            duration: "1s",
        },
        opacity: {
            value: 0,
            delay: 0.1,
            duration: 200,
            easing: "ease-in",
        },
    },
    showDuration: "4s",
    showEasing: "cubic-bezier(0.16, 2.04, 0.41, 1.67)",
    showDelay: 50,
    hideTransition: {
        transform: "translateX(300%)",
        opacity: {
            value: 0,
            delay: "100ms",
            duration: 0.2,
        },
        overflow: {
            value: "hidden",
            duration: 0,
            delay: 0,
        },
    },
    hideDuration: "300ms",
    hideEasing: "cubic-bezier(0, -0.4, 0.54, -0.34)",
};

const expected = {
    startHidden: true,
    startWithTransition: true,
    showTransition: {
        styles: {
            transform: "translateY(-200%)",
            background: "red",
            opacity: 0,
        },
        instantStyles: {},
        cssTransitionProperty: [
            `transform ${showDuration} ${showEasing} ${showDelay}`,
            `background ${stringifyCssTransitionNumber(
                "1s"
            )} ${showEasing} ${showDelay}`,
            `opacity ${stringifyCssTransitionNumber(
                200
            )} ease-in ${stringifyCssTransitionNumber(0.1)}`,
        ],
    },
    hideTransition: {
        styles: {
            transform: "translateX(300%)",
            opacity: 0,
        },
        instantStyles: {
            overflow: "hidden",
        },
        cssTransitionProperty: [
            `transform ${hideDuration} ${hideEasing} ${hideDelay}`,
            `opacity ${stringifyCssTransitionNumber(
                0.2
            )} ${hideEasing} ${stringifyCssTransitionNumber(100)}`,
        ],
    },
};

const fixture = [name, input, expected];

export default fixture;
