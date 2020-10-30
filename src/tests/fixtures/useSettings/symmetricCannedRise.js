import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const defaultDuration = stringifyCssTransitionNumber(DEFAULTS.duration);
const defaultDelay = stringifyCssTransitionNumber(DEFAULTS.delay);

const showEasing = "ease-out";
const hideEasing = "ease";

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
            `transform ${defaultDuration} ${showEasing} ${defaultDelay}`,
            `opacity ${defaultDuration} ${showEasing} ${defaultDelay}`,
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
            `transform ${defaultDuration} ${hideEasing} ${defaultDelay}`,
            `opacity ${defaultDuration} ${hideEasing} ${stringifyCssTransitionNumber(
                50
            )}`,
        ],
    },
};

export default [name, input, expected];
