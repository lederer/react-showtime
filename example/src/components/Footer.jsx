/** @jsx jsx */
import { jsx, Image, Link } from "theme-ui";

import azavea from "../img/azavea.svg";

const sx = {
    footer: {
        display: "grid",
        placeItems: "center",
        height: "12rem",
        bg: "white",
    },
};

function Footer(props) {
    return (
        <footer sx={sx.footer} {...props}>
            <Link href="https://www.azavea.com/">
                <Image src={azavea} width="120" />
            </Link>
        </footer>
    );
}

export default Footer;
