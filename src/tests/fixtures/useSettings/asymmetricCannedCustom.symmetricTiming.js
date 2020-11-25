import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const duration = stringifyCssTransitionNumber(500);
const delay = stringifyCssTransitionNumber(150);
const easing = "linear";

const name =
    "asymmetric canned/custom transitions (scale, shuriken) with symmetric timing";

const input = {
    showTransition: "scale",
    hideTransition: {
        transform: "translateX(100vw) rotate(720deg)",
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
            transform: "scale(0)",
        },
        instantStyles: {},
        cssTransitionProperty: [`transform ${duration} ${easing} ${delay}`],
    },
    hideTransition: {
        styles: {
            transform: "translateX(100vw) rotate(720deg)",
        },
        instantStyles: {},
        cssTransitionProperty: [`transform ${duration} ${easing} ${delay}`],
    },
};

const fixture = [name, input, expected];

export default fixture;
