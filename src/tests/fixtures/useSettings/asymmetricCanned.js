import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const defaultDuration = stringifyCssTransitionNumber(DEFAULTS.duration);
const defaultDelay = stringifyCssTransitionNumber(DEFAULTS.delay);

const showEasing = "ease-out";
const hideEasing = "ease-in";
const hideDelay = stringifyCssTransitionNumber(100);

const name = "asymmetric canned transitions (rise, slideFade)";

const input = { showTransition: "rise", hideTransition: "slideFade" };

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
