/** @jsx jsx */
import { jsx, Text, Link } from "theme-ui";

const sx = {
    container: {
        px: 2,
    },
    tldr: {
        mb: 3,
        fontFamily: "Pompiere, cursive",
        fontSize: "4.8rem",
        fontWeight: "bold",
        lineHeight: 1.4,
        textAlign: "center",
    },
    desc: { mt: 2 },
    features: {
        listStyle: "none",
        pl: "3.2rem",
        textIndent: "-3.2rem",
    },
    feature: {
        mb: 1,
    },
    link: {
        fontWeight: "bold",
    },
};

function About(props) {
    return (
        <div sx={sx.container} {...props}>
            <Text sx={sx.tldr}>Mount &amp; unmount with CSS transitions</Text>
            <Text sx={sx.desc}>
                <strong>React Showtime</strong> makes it easy to apply CSS
                transitions to the appearance and disappearance of React
                elements and components. It automatically handles mounting and
                unmounting to allow time for transitions to occur.
            </Text>
            <ul sx={sx.features}>
                <li
                    sx={{
                        ...sx.feature,
                        "::before": { content: "'👯'", mr: "1.2rem" },
                    }}
                >
                    Choose between <code>useShowtime</code> hook and{" "}
                    <code>&lt;Showtime /&gt;</code> component.
                </li>
                <li
                    sx={{
                        ...sx.feature,
                        "::before": { content: "'💃'", mr: "1.2rem" },
                    }}
                >
                    Feels familiar: <code>useShowtime</code> is a near-drop-in
                    replacement for conditional rendering with a state boolean.
                </li>
                <li
                    sx={{
                        ...sx.feature,
                        "::before": { content: "'💅'", mr: "1.2rem" },
                    }}
                >
                    Specify <em>showing</em> styles however you like – inline,
                    Emotion, styled-components, classnames, you name it.
                </li>
                <li
                    sx={{
                        ...sx.feature,
                        "::before": { content: "'💨'", mr: "1.2rem" },
                    }}
                >
                    Sensible API for defining <em>hidden</em> styles and custom
                    transitions.
                </li>
                <li
                    sx={{
                        ...sx.feature,
                        "::before": { content: "'🎩'", mr: "1.2rem" },
                    }}
                >
                    Preset transitions: <code>slideFade</code>,{" "}
                    <code>slide</code>, <code>fade</code>, <code>rise</code>,{" "}
                    <code>scale</code>, <code>scaleTop</code>.
                </li>
                <li
                    sx={{
                        ...sx.feature,
                        "::before": { content: "'🎭'", mr: "1.2rem" },
                    }}
                >
                    Symmetric or asymmetric show/hide transitions.
                </li>
                <li
                    sx={{
                        ...sx.feature,
                        "::before": { content: "'🕴'", mr: "1.2rem" },
                    }}
                >
                    Zero dependencies. 21k unpacked.
                </li>
            </ul>
            <Text sx={sx.more}>
                Examples below. For API and further details,{" "}
                <Link
                    sx={sx.link}
                    title="Go to repo"
                    href="https://github.com/azavea/react-showtime"
                >
                    see the README
                </Link>
                .
            </Text>
        </div>
    );
}

export default About;
