import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const defaultDuration = stringifyCssTransitionNumber(DEFAULTS.duration);
const defaultDelay = stringifyCssTransitionNumber(DEFAULTS.delay);
const defaultEasing = "ease";

const showEasing = "ease-out";

const name = "asymmetric canned/custom transitions (rise, shuriken)";

const input = {
    showTransition: "rise",
    hideTransition: {
        transform: "translateX(100vw) rotate(720deg)",
    },
};

const expected = {
    startHidden: DEFAULTS.startHidden,
    startWithTransition: DEFAULTS.startWithTransition,
    showTransition: {
        styles: {
            transform: "translateY(50%)",
            opacity: 0,
        },
        instantStyles: {
            zIndex: 1,
        },
        cssTransitionProperty: [
            `transform ${defaultDuration} ${showEasing} ${defaultDelay}`,
            `opacity ${defaultDuration} ${showEasing} ${defaultDelay}`,
        ],
    },
    hideTransition: {
        styles: {
            transform: "translateX(100vw) rotate(720deg)",
        },
        instantStyles: {},
        cssTransitionProperty: [
            `transform ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
        ],
    },
};

export default [name, input, expected];
