/** @jsx jsx */
import { jsx, Text } from "theme-ui";
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
        mb: 2,
        fontSize: 8,
        fontWeight: "bold",
        textAlign: "center",
    },
    desc: {
        mb: 4,
        textAlign: "center",
        "& code": {
            fontFamily: "monospace",
            px: "0.4rem",
            bg: "#fd7c8328",
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
        padding: "0 0.4rem",
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
        px: 4,
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

const RandomEmoji = forwardRef((props, ref) => {
    const emoji = useRef(emojis[Math.floor(Math.random() * emojis.length)]);

    return (
        <div sx={sx.emoji} ref={ref} {...props}>
            <span
                role="img"
                aria-label="random emoji"
                sx={{ transform: "perspective(0)" }}
            >
                {emoji.current}
            </span>
        </div>
    );
});

const Canvas = (props) => {
    return <div sx={sx.canvas} {...props} />;
};

const scope = { useShowtime, Showtime, useState, Button, RandomEmoji };

function Example({ name, desc, code, ...props }) {
    return (
        <div sx={sx.container} {...props}>
            <Text sx={sx.name}>{name}</Text>
            <Text sx={sx.desc} dangerouslySetInnerHTML={{ __html: desc }} />
            <div sx={sx.example}>
                <LiveProvider scope={scope} code={code}>
                    <LiveEditor style={sx.editor} />
                    <LiveError />
                    <LivePreview Component={Canvas} />
                </LiveProvider>
            </div>
        </div>
    );
}

export default Example;
