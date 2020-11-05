import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const defaultDuration = stringifyCssTransitionNumber(DEFAULTS.duration);
const defaultDelay = stringifyCssTransitionNumber(DEFAULTS.delay);
const defaultEasing = DEFAULTS.easing;

const name = "symmetric canned scale transition";

const input = "scale";

const expected = {
    startHidden: DEFAULTS.startHidden,
    startWithTransition: DEFAULTS.startWithTransition,
    showTransition: {
        styles: {
            transform: "scale(0)",
        },
        instantStyles: {},
        cssTransitionProperty: [
            `transform ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
        ],
    },
    hideTransition: {
        styles: {
            transform: "scale(0)",
        },
        instantStyles: {},
        cssTransitionProperty: [
            `transform ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
        ],
    },
};

const fixture = [name, input, expected];

export default fixture;
