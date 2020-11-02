import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const defaultDuration = stringifyCssTransitionNumber(DEFAULTS.duration);
const defaultDelay = stringifyCssTransitionNumber(DEFAULTS.delay);
const defaultEasing = DEFAULTS.easing;

const name = "symmetric canned rise transition";

const input = "rise";

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
            transform: "translateY(50%)",
            opacity: 0,
        },
        instantStyles: {
            zIndex: 1,
        },
        cssTransitionProperty: [
            `transform ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
            `opacity ${defaultDuration} ${defaultEasing} ${stringifyCssTransitionNumber(
                50
            )}`,
        ],
    },
};

export default [name, input, expected];
