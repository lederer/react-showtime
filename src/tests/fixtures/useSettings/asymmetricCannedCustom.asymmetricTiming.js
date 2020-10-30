import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const showDuration = stringifyCssTransitionNumber(500);
const showDelay = stringifyCssTransitionNumber(150);
const showEasing = "linear";

const hideDuration = stringifyCssTransitionNumber(800);
const hideDelay = stringifyCssTransitionNumber(250);
const hideEasing = "ease-out";

const name =
    "asymmetric canned/custom transitions (slideFade, shuriken) with asymmetric timing";

const input = {
    showTransition: "slideFade",
    showDuration: 500,
    showDelay: 150,
    showEasing: "linear",
    hideTransition: {
        transform: "translateX(100vw) rotate(720deg)",
    },
    hideDuration: 800,
    hideDelay: 250,
    hideEasing: "ease-out",
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
            opacity: 0,
        },
        instantStyles: {
            overflow: "hidden",
        },
        cssTransitionProperty: [
            `height ${showDuration} ${showEasing} ${showDelay}`,
            `min-height ${showDuration} ${showEasing} ${showDelay}`,
            `padding-top ${showDuration} ${showEasing} ${showDelay}`,
            `padding-bottom ${showDuration} ${showEasing} ${showDelay}`,
            `margin-top ${showDuration} ${showEasing} ${showDelay}`,
            `margin-bottom ${showDuration} ${showEasing} ${showDelay}`,
            `opacity ${showDuration} ${showEasing} ${stringifyCssTransitionNumber(
                150
            )}`,
        ],
    },
    hideTransition: {
        styles: {
            transform: "translateX(100vw) rotate(720deg)",
        },
        instantStyles: {},
        cssTransitionProperty: [
            `transform ${hideDuration} ${hideEasing} ${hideDelay}`,
        ],
    },
};

export default [name, input, expected];
