/** @jsx jsx */
import { jsx, NavLink } from "theme-ui";

const sx = {
    nav: {
        position: "sticky",
        top: 0,
        display: "flex",
        justifyContent: "center",
        height: "9.6rem",
        fontSize: 5,
        px: 2,
    },
    link: {
        display: "grid",
        alignContent: "center",
        px: 4,
        color: "accent",
    },
};

function Nav(props) {
    return (
        <nav sx={sx.nav} {...props}>
            <NavLink sx={sx.link} href="#hook">
                Hook
            </NavLink>
            <NavLink sx={sx.link} href="#component">
                Component
            </NavLink>
            <NavLink sx={sx.link} href="#presets">
                Presets
            </NavLink>
        </nav>
    );
}

export default Nav;
