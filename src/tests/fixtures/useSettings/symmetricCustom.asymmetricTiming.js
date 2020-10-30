import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const showDuration = stringifyCssTransitionNumber(500);
const showDelay = stringifyCssTransitionNumber(150);
const showEasing = "linear";

const hideDuration = stringifyCssTransitionNumber(800);
const hideDelay = stringifyCssTransitionNumber(250);
const hideEasing = "ease-out";

const name = "symmetric custom transition (switchblade) with asymmetric timing";

const input = {
    transition: {
        transform: "translate(-2.4rem, -1.6rem) rotate(-270deg)",
        transformOrigin: {
            value: "top left",
            duration: 0,
            delay: 0,
        },
    },
    showDuration: 500,
    showDelay: 150,
    showEasing: "linear",
    hideDuration: 800,
    hideDelay: 250,
    hideEasing: "ease-out",
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
            `transform ${showDuration} ${showEasing} ${showDelay}`,
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
            `transform ${hideDuration} ${hideEasing} ${hideDelay}`,
        ],
    },
};

export default [name, input, expected];
