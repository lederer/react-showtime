/** @jsx jsx */
import { jsx, NavLink, Image } from "theme-ui";

const sx = {
    ticket: {
        "--opacity": 0,
        position: "relative",
        py: "0.6rem",
        px: 2,
        fontFamily: "Pompiere, cursive",
        fontSize: "2.6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "black",
        "@media (max-width: 600px)": {
            px: "1rem",
            fontSize: "2rem",
        },
        "@media (max-width: 400px)": {
            fontSize: "1.8rem",
        },
        "::before": {
            position: "absolute",
            zIndex: -1,
            content: "''",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            bg: "ticket",
            "--stop-list": "transparent 1rem, #000 0",
            "@media (max-width: 600px)": {
                "--stop-list": "transparent 0.6rem, #000 0",
            },
            mask:
                "radial-gradient(circle at top left, var(--stop-list)), radial-gradient(circle at bottom left, var(--stop-list)), radial-gradient(circle at top right, var(--stop-list)), radial-gradient(circle at bottom right, var(--stop-list))",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in, source-in, source-in, xor",
            opacity: "var(--opacity)",
            transition: "opacity 250ms",
        },
    },
    content: {
        display: "flex",
        alignItems: "center",
        boxShadow: "inset 0 0 0 calc(2px * var(--opacity)) #d73e5d66",
        borderRadius: "6px",
        py: "0.4rem",
        px: 1,
        "@media (max-width: 600px)": {
            px: "0.6rem",
        },
    },
    icon: {
        flex: "none",
        mr: 1,
        opacity: 0.8,
        width: "2.8rem",
        height: "2.8rem",
        "@media (max-width: 600px)": {
            width: "2rem",
            height: "2rem",
        },
    },
    labelContainer: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    inactiveLabel: {
        position: "absolute",
        opacity: "calc(1 - var(--opacity))",
        transition: "opacity 150ms",
        pointerEvents: "none",
    },
    activeLabel: {
        opacity: "var(--opacity)",
        fontFamily: "'Arial Narrow', Arial, sans-serif",
        fontSize: "2.4rem",
        "@media (max-width: 600px)": {
            fontSize: "1.7rem",
        },
        "@media (max-width: 400px)": {
            fontSize: "1.3rem",
        },
        fontWeight: "bold",
        textTransform: "uppercase",
        transition: "opacity 150ms",
    },
};

function Ticket({
    active,
    iconSrc,
    fontSize,
    activeFontSize,
    label,
    iconAlt = "",
    ...props
}) {
    return (
        <NavLink
            sx={{
                ...sx.ticket,
                "--opacity": active ? 1 : 0,
            }}
            {...props}
        >
            <span sx={sx.content}>
                <Image
                    src={iconSrc}
                    sx={sx.icon}
                    alt={iconAlt}
                    width={28}
                    height={28}
                />
                <span sx={sx.labelContainer}>
                    <span sx={sx.inactiveLabel}>{label}</span>
                    <span sx={{ ...sx.activeLabel, fontSize: activeFontSize }}>
                        {label}
                    </span>
                </span>
            </span>
        </NavLink>
    );
}

export default Ticket;
