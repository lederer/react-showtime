import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const defaultDuration = stringifyCssTransitionNumber(DEFAULTS.duration);
const defaultDelay = stringifyCssTransitionNumber(DEFAULTS.delay);
const defaultEasing = DEFAULTS.easing;

const name = "symmetric custom transition (switchblade)";

const input = {
    transition: {
        transform: "translate(-2.4rem, -1.6rem) rotate(-270deg)",
        transformOrigin: {
            value: "top left",
            duration: 0,
            delay: 0,
        },
    },
};

const expected = {
    startHidden: DEFAULTS.startHidden,
    startWithTransition: DEFAULTS.startWithTransition,
    showTransition: {
        styles: {
            transform: "translate(-2.4rem, -1.6rem) rotate(-270deg)",
        },
        instantStyles: {
            transformOrigin: "top left",
        },
        cssTransitionProperty: [
            `transform ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
        ],
    },
    hideTransition: {
        styles: {
            transform: "translate(-2.4rem, -1.6rem) rotate(-270deg)",
        },
        instantStyles: {
            transformOrigin: "top left",
        },
        cssTransitionProperty: [
            `transform ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
        ],
    },
};

export default [name, input, expected];
