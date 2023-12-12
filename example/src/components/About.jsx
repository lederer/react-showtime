/** @jsx jsx */
import { jsx, Text, Link } from "theme-ui";
import { useLayoutEffect } from "react";
import useFontFaceObserver from "../hooks/useFontFaceObserver";
import { useShowtime } from "react-showtime";

const sx = {
    container: {
        px: 3,
        "@media (max-width: 600px)": {
            px: 2,
        },
    },
    heading: {
        mb: 3,
        fontFamily: "Pompiere, cursive",
        fontSize: "4.8rem",
        fontWeight: "bold",
        lineHeight: 1.4,
        transition: "opacity 1000ms",
        "@media (max-width: 600px)": {
            fontSize: "3.2rem",
        },
    },
    tldr: {
        display: "inline-block",
        width: "100%",
    },
    emojis: {
        display: "inline-block",
    },
    emoji: {
        mx: 1,
        fontSize: "4rem",
        "@media (max-width: 600px)": {
            mx: "0.4rem",
            fontSize: "2.4rem",
        },
        pointerEvents: "none",
    },
    desc: {},
    features: {
        listStyle: "none",
        my: 3,
        pl: "3.2rem",
        textIndent: "-3.2rem",
    },
    feature: {
        mb: 1,
    },
    more: {},
    link: {
        fontWeight: "bold",
        whiteSpace: "nowrap",
    },
};

function About(props) {
    const isFontLoaded = useFontFaceObserver("Pompiere");
    const [textRef, isTextMounted, showText] = useShowtime({
        startHidden: true,
        easing: "cubic-bezier(0.34, 1.56, 0.92, 0.88)",
        transition: {
            transform: {
                value: "translateX(100vw)",
                delay: 250,
            },
        },
    });
    const [emojisRef, areEmojisMounted, showEmojis] = useShowtime({
        startHidden: true,
        duration: 250,
        delay: 400,
        easing: "cubic-bezier(0.34, 1.56, 0.92, 0.88)",
        transition: {
            transform: "translateX(100vw)",
        },
    });
    const [detailsRef] = useShowtime({
        startWithTransition: true,
        transition: "fade",
    });

    useLayoutEffect(() => {
        if (isFontLoaded) {
            showEmojis();
            showText();
        }
    }, [isFontLoaded, showText, showEmojis]);

    return (
        <div sx={sx.container} {...props}>
            {isTextMounted && (
                <Text sx={sx.heading}>
                    <span sx={sx.tldr} ref={textRef}>
                        Mount &amp; unmount with{" "}
                        <span sx={{ whiteSpace: "nowrap" }}>
                            CSS transitions{" "}
                            {areEmojisMounted && (
                                <span sx={sx.emojis} ref={emojisRef}>
                                    <span
                                        role="img"
                                        aria-label="drum"
                                        sx={sx.emoji}
                                    >
                                        🥁
                                    </span>
                                    <span
                                        role="img"
                                        aria-label="performing arts"
                                        sx={sx.emoji}
                                    >
                                        🎭
                                    </span>
                                </span>
                            )}
                        </span>
                    </span>
                </Text>
            )}
            <div ref={detailsRef}>
                <Text sx={sx.desc}>
                    <strong>React Showtime</strong> makes it easy to apply CSS
                    transitions to the appearance and disappearance of React
                    elements. It automatically handles mounting and unmounting
                    to allow time for transitions to occur.
                </Text>
                <ul sx={sx.features}>
                    <li
                        sx={{
                            ...sx.feature,
                            "::before": { content: "'👯'", mr: 2 },
                        }}
                    >
                        Choose between{" "}
                        <code sx={{ variant: "text.code" }}>useShowtime</code>{" "}
                        hook and{" "}
                        <code sx={{ variant: "text.code" }}>
                            &lt;Showtime&gt;
                        </code>{" "}
                        component.
                    </li>
                    <li
                        sx={{
                            ...sx.feature,
                            "::before": { content: "'💃'", mr: 2 },
                        }}
                    >
                        Feels familiar:{" "}
                        <code sx={{ variant: "text.code" }}>useShowtime</code>{" "}
                        is a near-drop-in replacement for conditional rendering
                        with a state boolean.
                    </li>
                    <li
                        sx={{
                            ...sx.feature,
                            "::before": { content: "'💅'", mr: 2 },
                        }}
                    >
                        Specify <em>showing</em> styles however you like –
                        inline, Emotion, styled-components, classnames, you name
                        it.
                    </li>
                    <li
                        sx={{
                            ...sx.feature,
                            "::before": { content: "'💨'", mr: 2 },
                        }}
                    >
                        Sensible API for defining <em>hidden</em> styles and
                        custom transitions.
                    </li>
                    <li
                        sx={{
                            ...sx.feature,
                            "::before": { content: "'🎩'", mr: 2 },
                        }}
                    >
                        Included transitions:{" "}
                        <code sx={{ variant: "text.code" }}>slideFade</code>,{" "}
                        <code sx={{ variant: "text.code" }}>slide</code>,{" "}
                        <code sx={{ variant: "text.code" }}>fade</code>,{" "}
                        <code sx={{ variant: "text.code" }}>rise</code>,{" "}
                        <code sx={{ variant: "text.code" }}>scale</code>.
                    </li>
                    <li
                        sx={{
                            ...sx.feature,
                            "::before": { content: "'🎭'", mr: 2 },
                        }}
                    >
                        Symmetric or asymmetric show/hide transitions.
                    </li>
                    <li
                        sx={{
                            ...sx.feature,
                            "::before": { content: "'🕴'", mr: 2 },
                        }}
                    >
                        Zero dependencies. 3.4k min+gzip.
                    </li>
                </ul>
                <Text sx={sx.more}>
                    Examples below. For API and further details,{" "}
                    <Link
                        sx={sx.link}
                        title="Go to repo"
                        href="https://github.com/lederer/react-showtime"
                    >
                        see the README
                    </Link>
                    .
                </Text>
            </div>
        </div>
    );
}

export default About;
