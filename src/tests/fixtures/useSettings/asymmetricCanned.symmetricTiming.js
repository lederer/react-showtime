import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const duration = stringifyCssTransitionNumber(500);
const delay = stringifyCssTransitionNumber(150);
const easing = "linear";

const name =
    "asymmetric canned transitions (slide, fade) with symmetric timing";

const input = {
    showTransition: "slide",
    hideTransition: "fade",
    duration: 500,
    delay: 150,
    easing: "linear",
};

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
            `height ${duration} ${easing} ${delay}`,
            `min-height ${duration} ${easing} ${delay}`,
            `padding-top ${duration} ${easing} ${delay}`,
            `padding-bottom ${duration} ${easing} ${delay}`,
            `margin-top ${duration} ${easing} ${delay}`,
            `margin-bottom ${duration} ${easing} ${delay}`,
        ],
    },
    hideTransition: {
        styles: {
            opacity: 0,
        },
        instantStyles: {},
        cssTransitionProperty: [`opacity ${duration} ${easing} ${delay}`],
    },
};

export default [name, input, expected];
