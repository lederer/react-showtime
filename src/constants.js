export const STATUS = Object.freeze({
    showing: "showing",
    hidden: "hidden",
    transitioningIn: "transitioningIn",
    transitioningOut: "transitioningOut",
});

export const DEFAULTS = Object.freeze({
    startHidden: false,
    startWithTransition: false,
    transition: "slideFade",
    duration: 250,
    delay: 0,
    easing: "ease",
});
