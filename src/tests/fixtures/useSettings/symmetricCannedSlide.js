import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const defaultDuration = stringifyCssTransitionNumber(DEFAULTS.duration);
const defaultDelay = stringifyCssTransitionNumber(DEFAULTS.delay);
const defaultEasing = DEFAULTS.easing;

const name = "symmetric canned slide transition";

const input = "slide";

const expected = {
    startHidden: DEFAULTS.startHidden,
    startWithTransition: DEFAULTS.startWithTransition,
    showTransition: {
        styles: {
            height: 0,
            minHeight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
        },
        instantStyles: {
            overflow: "hidden",
        },
        cssTransitionProperty: [
            `height ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
            `min-height ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
            `padding-top ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
            `padding-bottom ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
            `margin-top ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
            `margin-bottom ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
        ],
    },
    hideTransition: {
        styles: {
            height: 0,
            minHeight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
        },
        instantStyles: {
            overflow: "hidden",
        },
        cssTransitionProperty: [
            `height ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
            `min-height ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
            `padding-top ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
            `padding-bottom ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
            `margin-top ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
            `margin-bottom ${defaultDuration} ${defaultEasing} ${defaultDelay}`,
        ],
    },
};

const fixture = [name, input, expected];

export default fixture;
