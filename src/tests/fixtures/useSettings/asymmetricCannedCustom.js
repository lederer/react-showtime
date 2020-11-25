import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const defaultDuration = stringifyCssTransitionNumber(DEFAULTS.duration);
const defaultDelay = stringifyCssTransitionNumber(DEFAULTS.delay);
const defaultEasing = DEFAULTS.easing;

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
            `transform ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
            `opacity ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
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

const fixture = [name, input, expected];

export default fixture;
