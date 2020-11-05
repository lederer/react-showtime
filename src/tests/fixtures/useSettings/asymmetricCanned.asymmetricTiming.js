import { DEFAULTS } from "../../../constants";
import { stringifyCssTransitionNumber } from "../../../utils";

const showDuration = stringifyCssTransitionNumber(500);
const showDelay = stringifyCssTransitionNumber(150);
const showEasing = "linear";

const hideDuration = stringifyCssTransitionNumber(800);
const hideDelay = stringifyCssTransitionNumber(250);
const hideEasing = "ease-out";

const name =
    "asymmetric canned transitions (rise, slideFade) with asymmetric timing";

const input = {
    showTransition: "rise",
    showDuration: 500,
    showDelay: 150,
    showEasing: "linear",
    hideTransition: "slideFade",
    hideDuration: 800,
    hideDelay: 250,
    hideEasing: "ease-out",
};

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
            `transform ${showDuration} ${showEasing} ${showDelay}`,
            `opacity ${showDuration} ${showEasing} ${showDelay}`,
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
            `height ${hideDuration} ${hideEasing} ${hideDelay}`,
            `min-height ${hideDuration} ${hideEasing} ${hideDelay}`,
            `padding-top ${hideDuration} ${hideEasing} ${hideDelay}`,
            `padding-bottom ${hideDuration} ${hideEasing} ${hideDelay}`,
            `margin-top ${hideDuration} ${hideEasing} ${hideDelay}`,
            `margin-bottom ${hideDuration} ${hideEasing} ${hideDelay}`,
            `opacity ${hideDuration} ${hideEasing} ${stringifyCssTransitionNumber(
                0
            )}`,
        ],
    },
};

const fixture = [name, input, expected];

export default fixture;
