const transitions = Object.freeze({
    scale: Object.freeze({
        transition: Object.freeze({
            transform: "scale(0)",
        }),
    }),
    slide: Object.freeze({
        transition: Object.freeze({
            height: 0,
            minHeight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
            overflow: Object.freeze({
                value: "hidden",
                duration: 0,
                delay: 0,
            }),
        }),
    }),
    fade: Object.freeze({
        transition: Object.freeze({
            opacity: 0,
        }),
    }),
    slideFade: Object.freeze({
        showTransition: Object.freeze({
            height: 0,
            minHeight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
            overflow: Object.freeze({
                value: "hidden",
                duration: 0,
                delay: 0,
            }),
            opacity: Object.freeze({
                value: 0,
                delay: 150,
            }),
        }),
        hideDelay: 100,
        hideEasing: "ease-in",
        hideTransition: Object.freeze({
            height: 0,
            minHeight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
            overflow: Object.freeze({
                value: "hidden",
                duration: 0,
                delay: 0,
            }),
            opacity: Object.freeze({
                value: 0,
                delay: 0,
            }),
        }),
    }),
    rise: Object.freeze({
        showTransition: Object.freeze({
            transform: "translateY(50%)",
            opacity: 0,
            zIndex: Object.freeze({
                value: 1,
                delay: 0,
                duration: 0,
            }),
        }),
        hideTransition: Object.freeze({
            transform: "translateY(50%)",
            opacity: Object.freeze({
                value: 0,
                delay: 50,
            }),
            zIndex: Object.freeze({
                value: 1,
                delay: 0,
                duration: 0,
            }),
        }),
    }),
});

export default transitions;
