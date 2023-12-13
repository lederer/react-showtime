/** @jsx jsx */
import { jsx, Text, Close } from "theme-ui";
import { forwardRef, useRef, useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { useShowtime, Showtime } from "react-showtime";

const emojis = ["👯", "💃", "🕺", "🎩", "🎭", "🕴"];

const sx = {
    container: {
        width: "88rem",
        maxWidth: "100%",
        mx: "auto",
    },
    name: {
        display: "block",
        mb: 2,
        fontFamily: "Pompiere, cursive",
        fontSize: "4.2rem",
        textTransform: "uppercase",
        textAlign: "center",
    },
    desc: {
        display: "block",
        mb: 4,
        textAlign: "center",
        "& code": {
            fontFamily: "monospace",
            px: "0.4rem",
            bg: "#fd7c8328",
        },
    },
    tabs: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        mb: 4,
    },
    tab: {
        appearance: "none",
        border: "none",
        bg: "darktint",
        mx: 1,
        px: 3,
        py: 1,
        fontFamily: "Pompiere, cursive",
        fontSize: 7,
        cursor: "pointer",
        ":hover": {
            bg: "ticket",
        },
        "@media (max-width: 600px)": {
            fontSize: 4,
            px: 2,
            mx: "0.4rem",
        },
    },
    example: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "stretch",
        alignItems: "stretch",
        minHeight: "28rem",
        "@media (min-width: 900px)": {
            boxShadow: 2,
        },
        "@media (max-width: 600px)": {
            flexDirection: "column",
        },
    },
    editor: {
        flex: "auto",
        padding: 0,
        background: "#322a37",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "1.2rem",
        caretColor: "white",
    },
    button: {
        flex: "none",
        appearance: "none",
        width: "20rem",
        border: "none",
        mt: "auto",
        p: 2,
        bg: "ticket",
        color: "black",
        fontSize: 4,
        fontWeight: "bold",
        boxShadow: 1,
        cursor: "pointer",
    },
    emoji: {
        flex: "none",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "8rem",
        px: 2,
        my: "1px",
        fontSize: 7,
        "--stripe": (theme) => theme.colors.tint,
        background: `linear-gradient(135deg, var(--stripe) 25%, transparent 25%) -0.8rem 0,
                     linear-gradient(225deg, var(--stripe) 25%, transparent 25%) -0.8rem 0,
                     linear-gradient(315deg, var(--stripe) 25%, transparent 25%),
                     linear-gradient(45deg, var(--stripe) 25%, transparent 25%)`,
        backgroundSize: "1.6rem 1.6rem",
        bg: "darktint",
        ":last-of-type": {
            mb: 4,
        },
    },
    close: {
        flex: "none",
        ml: "auto",
        width: "4rem",
        height: "4rem",
        cursor: "pointer",
    },
    canvas: {
        bg: "white",
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: "none",
        flexBasis: "40%",
        width: "40%",
        maxWidth: "40%",
        minHeight: "36rem",
        overflow: "hidden",
        "@media (max-width: 600px)": {
            flexBasis: "100%",
            width: "100%",
            maxWidth: "100%",
        },
    },
};

const Button = ({ label, ...props }) => {
    return (
        <button sx={sx.button} {...props}>
            {label}
        </button>
    );
};

const RandomEmoji = forwardRef(({ onClose, ...props }, ref) => {
    const emoji = useRef(emojis[Math.floor(Math.random() * emojis.length)]);

    return (
        <div
            sx={{
                ...sx.emoji,
                ...(ref
                    ? {}
                    : {
                          filter: "grayscale(1)",
                          "--stripe": "#ddd",
                      }),
            }}
            ref={ref}
            {...props}
        >
            <span role="img" aria-label="random emoji" sx={{ flex: "none" }}>
                {emoji.current}
            </span>
            {onClose && <Close sx={sx.close} onClick={onClose} />}
        </div>
    );
});

const Canvas = (props) => {
    return <div sx={sx.canvas} {...props} />;
};

const scope = { useShowtime, Showtime, useState, Button, RandomEmoji };

function Example({ name, desc, code, noInline, ...props }) {
    const isComplex = typeof code === "object";
    const initialTransition = isComplex ? Object.keys(code)[0] : null;
    const [selectedTransition, setSelectedTransition] =
        useState(initialTransition);

    if (!code) {
        return null;
    }

    return (
        <div sx={sx.container} {...props}>
            <Text sx={sx.name} as="h4">
                {name}
            </Text>
            <Text
                sx={sx.desc}
                as="div"
                dangerouslySetInnerHTML={{ __html: desc }}
            />
            {isComplex && (
                <div sx={sx.tabs}>
                    {Object.keys(code).map((name) => (
                        <button
                            sx={{
                                ...sx.tab,
                                ...(name === selectedTransition
                                    ? { bg: "ticket" }
                                    : {}),
                            }}
                            onClick={() => setSelectedTransition(name)}
                            key={name}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}
            <div sx={sx.example}>
                <LiveProvider
                    scope={scope}
                    code={isComplex ? code[selectedTransition] : code}
                    noInline={noInline}
                >
                    <LiveEditor style={sx.editor} />
                    <LiveError />
                    <LivePreview Component={Canvas} />
                </LiveProvider>
            </div>
        </div>
    );
}

export default Example;
