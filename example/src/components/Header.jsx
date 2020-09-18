/** @jsx jsx */
import { jsx, Link, Image } from "theme-ui";

import Ticket from "./Ticket";
import react from "../img/react.svg";
import github from "../img/github.svg";

const sx = {
    header: {
        "@media (min-width: 900px)": {
            position: "sticky",
            top: 0,
        },
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "9.2rem",
        py: 2,
        px: 3,
        bg: "white",
        "@media (max-width: 600px)": {
            py: 1,
            px: 2,
        },
    },
    title: {
        flex: "none",
        display: "flex",
        alignItems: "center",
        my: 0,
        mr: 2,
        transition: "transform 100ms",
    },
    showtime: {
        flex: "none",
        zIndex: 1,
        fontSize: "2.4rem",
        "@media (max-width: 500px)": {
            fontSize: "2rem",
            lineHeight: "3.2rem",
        },
    },
    repo: {
        flex: "none",
    },
    github: {
        "@media (max-width: 600px)": {
            width: "3.2rem",
        },
    },
};

const scrollTo = (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.scrollTo({ top: 0, behavior: "smooth" });
};

function Header({ compact = false, ...props }) {
    return (
        <header sx={sx.header} {...props}>
            <h1
                sx={{
                    ...sx.title,
                    ...(compact ? { transform: "translateX(-2rem)" } : {}),
                }}
            >
                <Ticket
                    href="#"
                    active={!compact}
                    sx={sx.showtime}
                    iconSrc={react}
                    iconAlt="React"
                    label="Showtime"
                    onClick={scrollTo}
                />
            </h1>
            <Link
                sx={sx.repo}
                title="Go to repo"
                href="https://github.com/azavea/react-showtime"
            >
                <Image
                    sx={sx.github}
                    src={github}
                    alt="Github"
                    width="40"
                    height="40"
                />
            </Link>
        </header>
    );
}

export default Header;
