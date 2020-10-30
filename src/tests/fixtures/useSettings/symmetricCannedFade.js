import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const defaultDuration = stringifyCssTransitionNumber(DEFAULTS.duration);
const defaultDelay = stringifyCssTransitionNumber(DEFAULTS.delay);
const defaultEasing = DEFAULTS.easing;

const name = "symmetric canned fade transition";

const input = "fade";

const expected = {
    startHidden: DEFAULTS.startHidden,
    startWithTransition: DEFAULTS.startWithTransition,
    showTransition: {
        styles: {
            opacity: 0,
        },
        instantStyles: {},
        cssTransitionProperty: [
            `opacity ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
        ],
    },
    hideTransition: {
        styles: {
            opacity: 0,
        },
        instantStyles: {},
        cssTransitionProperty: [
            `opacity ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
        ],
    },
};

export default [name, input, expected];
