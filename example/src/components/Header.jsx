/** @jsx jsx */
import { jsx, Link, Image } from "theme-ui";
import react from "../img/react.svg";
import github from "../img/github.svg";

const sx = {
    header: {
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        px: 3,
        bg: "white",
    },
    title: {
        flex: "none",
        display: "flex",
        alignItems: "center",
        my: 0,
        mr: 2,
    },
    showtime: {
        position: "relative",
        flex: "none",
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "'Arial Narrow', Arial, sans-serif",
        fontSize: "2.4rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "black",
        py: "1.2rem",
        pr: "2rem",
        pl: "1.2rem",
        zIndex: 0,
        "::before": {
            position: "absolute",
            zIndex: -1,
            content: "''",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            background: "#fd7c83",
            "--stop-list": "transparent 1rem, #000 0",
            mask:
                "radial-gradient(circle at top left, var(--stop-list)), radial-gradient(circle at bottom left, var(--stop-list)), radial-gradient(circle at top right, var(--stop-list)), radial-gradient(circle at bottom right, var(--stop-list))",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in, source-in, source-in, xor",
        },
    },
    react: {
        flex: "none",
        mr: 1,
    },
    emoji: {
        flex: "none",
        ml: 2,
        fontSize: "4rem",
    },
    repo: {
        flex: "none",
    },
};

function Header(props) {
    return (
        <header sx={sx.header} {...props}>
            <h1 sx={sx.title}>
                <span sx={sx.showtime}>
                    <Image sx={sx.react} src={react} width="32" height="32" />{" "}
                    Showtime
                </span>
                <span role="img" aria-label="drum" sx={sx.emoji}>
                    🥁
                </span>
                <span role="img" aria-label="performing arts" sx={sx.emoji}>
                    🎭
                </span>
            </h1>
            <Link
                sx={sx.repo}
                title="Go to repo"
                href="https://github.com/azavea/react-showtime"
            >
                <Image src={github} width="40" height="40" />
            </Link>
        </header>
    );
}

export default Header;
