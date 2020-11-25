import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const showDuration = stringifyCssTransitionNumber(500);
const showDelay = stringifyCssTransitionNumber(150);
const showEasing = "linear";

const hideDuration = stringifyCssTransitionNumber(800);
const hideDelay = stringifyCssTransitionNumber(250);
const hideEasing = "ease-out";

const name = "symmetric canned transition (scale) with asymmetric timing";

const input = {
    transition: "scale",
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
            transform: "scale(0)",
        },
        instantStyles: {},
        cssTransitionProperty: [
            `transform ${showDuration} ${showEasing} ${showDelay}`,
        ],
    },
    hideTransition: {
        styles: {
            transform: "scale(0)",
        },
        instantStyles: {},
        cssTransitionProperty: [
            `transform ${hideDuration} ${hideEasing} ${hideDelay}`,
        ],
    },
};

const fixture = [name, input, expected];

export default fixture;
