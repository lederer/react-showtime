import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const duration = stringifyCssTransitionNumber(500);
const delay = stringifyCssTransitionNumber(150);
const easing = "linear";

const name = "symmetric canned transition (scale) with symmetric timing";

const input = {
    transition: "scale",
    duration: 500,
    delay: 150,
    easing: "linear",
};

const expected = {
    startHidden: DEFAULTS.startHidden,
    startWithTransition: DEFAULTS.startWithTransition,
    showTransition: {
        styles: {
            transform: "scale(0)",
        },
        instantStyles: {},
        cssTransitionProperty: [`transform ${duration} ${easing} ${delay}`],
    },
    hideTransition: {
        styles: {
            transform: "scale(0)",
        },
        instantStyles: {},
        cssTransitionProperty: [`transform ${duration} ${easing} ${delay}`],
    },
};

export default [name, input, expected];
