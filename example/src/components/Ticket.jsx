/** @jsxImportSource theme-ui */
import { NavLink, Image } from "theme-ui";
import { forwardRef } from "react";

const sx = {
    ticket: {
        "--opacity": 0,
        position: "relative",
        py: 1,
        px: 2,
        color: "black",
        fontFamily: "'Arial Narrow', Arial, sans-serif",
        fontSize: "2.2rem",
        fontWeight: "bold",
        lineHeight: "4rem",
        textTransform: "uppercase",
        "@media (max-width: 500px)": {
            px: 1,
            fontSize: "1.3rem",
            lineHeight: "2.8rem",
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
            "@media (max-width: 500px)": {
                "--stop-list": "transparent 0.6rem, #000 0",
            },
            mask: "radial-gradient(circle at top left, var(--stop-list)), radial-gradient(circle at bottom left, var(--stop-list)), radial-gradient(circle at top right, var(--stop-list)), radial-gradient(circle at bottom right, var(--stop-list))",
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
        "@media (max-width: 500px)": {
            px: "0.6rem",
        },
    },
    icon: {
        flex: "none",
        mr: 1,
        opacity: 0.8,
        width: "2.8rem",
        height: "2.8rem",
        "@media (max-width: 500px)": {
            width: "2rem",
            height: "2rem",
        },
    },
};

const Ticket = forwardRef(
    ({ active, iconSrc, fontSize, label, iconAlt = "", ...props }, ref) => {
        return (
            <NavLink
                ref={ref}
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
                    {label}
                </span>
            </NavLink>
        );
    }
);

export default Ticket;
