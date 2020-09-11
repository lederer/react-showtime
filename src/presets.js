export const PRESETS = Object.freeze({
    scale: {
        always: {
            transformOrigin: "top",
        },
        hidden: {
            height: 0,
            minHeight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
            transform: "scaleY(0.5)",
            opacity: 0,
        },
    },
    slide: {
        hidden: {
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
        hidden: {
            opacity: 0,
        },
    },
    slideFade: {
        hidden: {
            opacity: 0,
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
        beforeShow: {
            opacity: {
                value: 0,
                delay: 100,
            },
            overflow: {
                value: "hidden",
                delay: 100,
            },
        },
        afterShow: {
            delay: 66,
            opacity: {
                value: 0,
                delay: 0,
            },
            overflow: {
                value: "hidden",
                delay: 0,
            },
        },
    },
});
