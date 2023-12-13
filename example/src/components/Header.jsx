/** @jsxImportSource theme-ui */
import { Link, Image } from "theme-ui";
import { useShowtime } from "react-showtime";

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

const BOUNCE = "cubic-bezier(0.34, 1.26, 1, 1.33)";

const TICKET_TRANSITIONS = [
    // shuriken
    {
        duration: 400,
        transition: {
            transform: "translateX(100vw) rotate(720deg)",
        },
    },
    // swing
    {
        transition: {
            transform: "translateX(-160%) rotate(270deg)",
        },
    },
    // snake
    {
        easing: "cubic-bezier(0.25, 1.66, 0.52, 2.04)",
        transition: {
            transform: "translateX(-160%)",
        },
    },
    // switchblade
    {
        transition: {
            transform: "translate(-2.4rem, -1.6rem) rotate(-270deg)",
            transformOrigin: {
                value: "top left",
                duration: 0,
                delay: 0,
            },
        },
    },
];

const randomTransition =
    TICKET_TRANSITIONS[Math.floor(TICKET_TRANSITIONS.length * Math.random())];

function Header({ compact = false, ...props }) {
    const [ref] = useShowtime({
        startWithTransition: true,
        delay: 50,
        easing: BOUNCE,
        ...randomTransition,
    });

    return (
        <header sx={sx.header} {...props}>
            <h1
                sx={{
                    ...sx.title,
                    ...(compact ? { transform: "translateX(-2rem)" } : {}),
                }}
            >
                <Ticket
                    ref={ref}
                    href="#"
                    active={!compact}
                    sx={sx.showtime}
                    iconSrc={react}
                    iconAlt="React"
                    label="Showtime"
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                />
            </h1>
            <Link
                sx={sx.repo}
                title="Go to repo"
                href="https://github.com/lederer/react-showtime"
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
