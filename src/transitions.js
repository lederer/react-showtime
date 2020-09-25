export default Object.freeze({
    scale: {
        transition: {
            transform: "scale(0)",
        },
    },
    slide: {
        transition: {
            height: 0,
            minHeight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
            overflow: {
                value: "hidden",
                duration: 0,
                delay: 0,
            },
        },
    },
    fade: {
        transition: {
            opacity: 0,
        },
    },
    slideFade: {
        showTransition: {
            height: 0,
            minHeight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
            overflow: {
                value: "hidden",
                duration: 0,
                delay: 0,
            },
            opacity: {
                value: 0,
                delay: 150,
            },
        },
        hideDelay: 100,
        hideEasing: "ease-in",
        hideTransition: {
            height: 0,
            minHeight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
            overflow: {
                value: "hidden",
                duration: 0,
                delay: 0,
            },
            opacity: {
                value: 0,
                delay: 0,
            },
        },
    },
    rise: {
        showEasing: "ease-out",
        showTransition: {
            transform: "translateY(50%)",
            opacity: 0,
            zIndex: {
                value: 1,
                delay: 0,
                duration: 0,
            },
        },
        hideEasing: "ease",
        hideTransition: {
            transform: "translateY(50%)",
            opacity: {
                value: 0,
                delay: 50,
            },
            zIndex: {
                value: 1,
                delay: 0,
                duration: 0,
            },
        },
    },
});
