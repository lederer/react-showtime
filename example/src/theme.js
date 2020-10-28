const theme = {
    space: [
        0,
        "0.8rem",
        "1.6rem",
        "2.4rem",
        "3.2rem",
        "4rem",
        "4.8rem",
        "5.6rem",
        "6.4rem",
    ],
    fonts: {
        body:
            '"Open Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        heading: "inherit",
        monospace: "'IBM Plex Mono', monospace",
    },
    fontSizes: [
        "1.1rem",
        "1.2rem",
        "1.3rem",
        "1.4rem",
        "1.6rem",
        "1.8rem",
        "2rem",
        "2.8rem",
        "3.4rem",
    ],
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.125,
    },
    colors: {
        text: "#222",
        textGray: "#565656",
        background: "#fff",
        backgroundGray: "#e7e7e7",
        divider: "#d7d7d7",
        disabled: "#ccc",
        muted: "#f6f6f6",
        accent: "#008484",
        ticket: "#fd7c83",
        tint: "#fff3f4",
        darktint: "#ffe0e3",
    },
    shadows: [
        "none",
        "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)",
        "0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.20)",
        "0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.20)",
        "0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.20)",
    ],
    text: {
        heading: {
            color: "text",
            fontFamily: "heading",
            lineHeight: "heading",
            fontWeight: "heading",
        },
        code: {
            fontFamily: "monospace",
            bg: "tint",
            px: "0.4rem",
        },
    },
    buttons: {
        button: {
            m: 0,
            px: 3,
            py: 2,
            font: "inherit",
            border: 0,
            borderRadius: "2px",
            cursor: "pointer",
        },
    },
    styles: {
        root: {
            fontFamily: "body",
            lineHeight: "body",
            fontWeight: "body",
            fontSize: 4,
            position: "relative",
            width: "100%",
            m: 0,
            p: 0,
            "@media (max-width: 400px)": {
                fontSize: 3,
            },
        },
        a: {
            textDecoration: "none",
            color: "accent",
        },
    },
};

export default theme;
