import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const duration = stringifyCssTransitionNumber(500);
const delay = stringifyCssTransitionNumber(150);
const easing = "linear";

const name = "symmetric custom transition (switchblade) with symmetric timing";

const input = {
    transition: {
        transform: "translate(-2.4rem, -1.6rem) rotate(-270deg)",
        transformOrigin: {
            value: "top left",
            duration: 0,
            delay: 0,
        },
    },
    duration: 500,
    delay: 150,
    easing: "linear",
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
        cssTransitionProperty: [`transform ${duration} ${easing} ${delay}`],
    },
    hideTransition: {
        styles: {
            transform: "translate(-2.4rem, -1.6rem) rotate(-270deg)",
        },
        instantStyles: {
            transformOrigin: "top left",
        },
        cssTransitionProperty: [`transform ${duration} ${easing} ${delay}`],
    },
};

export default [name, input, expected];
