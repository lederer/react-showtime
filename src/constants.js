export const STATUS = Object.freeze({
    showing: "showing",
    hidden: "hidden",
    showTransition: "showTransition",
    hideTransition: "hideTransition",
});

export const DEFAULTS = Object.freeze({
    startHidden: false,
    startWithTransition: false,
    transition: "slideFade",
    duration: 250,
    delay: 16, // Without a nominal delay, Safari (mac/ios) easings may not execute correctly
    easing: "ease",
});
