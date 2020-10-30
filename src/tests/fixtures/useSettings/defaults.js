import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const defaultDuration = stringifyCssTransitionNumber(DEFAULTS.duration);
const defaultDelay = stringifyCssTransitionNumber(DEFAULTS.delay);
const defaultEasing = DEFAULTS.easing;

const hideDelay = stringifyCssTransitionNumber(100);
const hideEasing = "ease-in";

const name = "default settings";

const input = undefined;

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
            opacity: 0,
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
            `opacity ${defaultDuration} ${defaultEasing} ${stringifyCssTransitionNumber(
                150
            )}`,
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
            opacity: 0,
        },
        instantStyles: {
            overflow: "hidden",
        },
        cssTransitionProperty: [
            `height ${defaultDuration} ${hideEasing} ${hideDelay}`,
            `min-height ${defaultDuration} ${hideEasing} ${hideDelay}`,
            `padding-top ${defaultDuration} ${hideEasing} ${hideDelay}`,
            `padding-bottom ${defaultDuration} ${hideEasing} ${hideDelay}`,
            `margin-top ${defaultDuration} ${hideEasing} ${hideDelay}`,
            `margin-bottom ${defaultDuration} ${hideEasing} ${hideDelay}`,
            `opacity ${defaultDuration} ${hideEasing} ${stringifyCssTransitionNumber(
                0
            )}`,
        ],
    },
};

export default [name, input, expected];
