/** @jsx jsx */
import { jsx } from "theme-ui";
import { forwardRef } from "react";

import Ticket from "./Ticket";

import hook from "../img/hook.svg";
import component from "../img/component.svg";
import presets from "../img/presets.svg";

const sx = {
    nav: {
        position: "sticky",
        top: 0,
        display: "flex",
        alignItems: "center",
        height: "9.2rem",
    },
    link: {
        flex: "none",
    },
};

const scrollTo = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const HEADER_OFFSET = -48;
    const id = event.currentTarget.getAttribute("href");
    const el = document.querySelectorAll(id)[0];
    const top =
        el.getBoundingClientRect().top + window.pageYOffset + HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
};

const Nav = forwardRef(
    ({ highlightActiveSection, activeSection, ...props }, ref) => {
        return (
            <nav sx={sx.nav} ref={ref} {...props}>
                <Ticket
                    href="#hook"
                    active={activeSection === "hook"}
                    sx={sx.link}
                    iconSrc={hook}
                    iconSize={28}
                    label="Hook"
                    activeFontSize="2.2rem"
                    onClick={scrollTo}
                />
                <Ticket
                    href="#component"
                    active={activeSection === "component"}
                    sx={sx.link}
                    iconSrc={component}
                    iconSize={28}
                    label="Component"
                    activeFontSize="2.2rem"
                    onClick={scrollTo}
                />
                <Ticket
                    href="#presets"
                    active={activeSection === "presets"}
                    sx={sx.link}
                    iconSrc={presets}
                    iconSize={28}
                    label="Presets"
                    activeFontSize="2.2rem"
                    onClick={scrollTo}
                />
            </nav>
        );
    }
);

export default Nav;
