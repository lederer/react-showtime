/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

import Header from "./components/Header";
import About from "./components/About";
import Nav from "./components/Nav";
import Examples from "./components/Examples";
import theme from "./theme";

const sx = {
    header: {
        mb: 2,
    },
    about: {
        maxWidth: "110ch",
        mx: "auto",
        mb: 3,
    },
    nav: {
        alignSelf: "center",
    },
};

const ROOT_MARGIN = `0px 0px -${window.innerHeight - 92}px 0px`;

function App() {
    const [activeSection, setActiveSection] = useState();

    const [navRef, isNavDocked] = useInView({
        rootMargin: ROOT_MARGIN,
    });

    return (
        <ThemeProvider theme={theme}>
            <Header sx={sx.header} compact={isNavDocked} />
            <About sx={sx.about} />
            <Nav
                sx={sx.nav}
                ref={navRef}
                activeSection={isNavDocked ? activeSection : null}
            />
            <Examples onActiveSectionChange={setActiveSection} />
            <footer>FOOTER</footer>
        </ThemeProvider>
    );
}

export default App;
