/** @jsxImportSource theme-ui */

const sx = {
    footer: {
        display: "grid",
        placeItems: "center",
        height: "12rem",
        bg: "white",
    },
};

function Footer(props) {
    return <footer sx={sx.footer} {...props} />;
}

export default Footer;
