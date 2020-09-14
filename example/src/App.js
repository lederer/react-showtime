/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Header from "./components/Header";
import About from "./components/About";
import Nav from "./components/Nav";
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

const INTERSECTION_THRESHOLD = [0, 0.25, 0.5, 0.75, 1];
const ROOT_MARGIN = `0px 0px -${window.innerHeight - 92}px 0px`;

function App() {
    const [activeSection, setActiveSection] = useState();

    const [navRef, isNavDocked] = useInView({
        rootMargin: ROOT_MARGIN,
    });

    const [hookRef, , hookEntry] = useInView({
        threshold: INTERSECTION_THRESHOLD,
    });

    const [componentRef, , componentEntry] = useInView({
        threshold: INTERSECTION_THRESHOLD,
    });

    const [presetsRef, , presetsEntry] = useInView({
        threshold: INTERSECTION_THRESHOLD,
    });

    useEffect(() => {
        if (
            !hookEntry?.intersectionRatio &&
            !componentEntry?.intersectionRatio &&
            !presetsEntry?.intersectionRatio
        ) {
            return;
        }

        const sections = [
            {
                name: "hook",
                ratio: hookEntry?.intersectionRatio || 0,
            },
            {
                name: "component",
                ratio: componentEntry?.intersectionRatio || 0,
            },
            {
                name: "presets",
                ratio: presetsEntry?.intersectionRatio || 0,
            },
        ];

        setActiveSection(
            sections.reduce((a, b) => (a.ratio > b.ratio ? a : b)).name
        );
    }, [hookEntry, componentEntry, presetsEntry]);

    return (
        <ThemeProvider theme={theme}>
            <Header sx={sx.header} compact={isNavDocked} />
            <About sx={sx.about} />
            <Nav
                sx={sx.nav}
                ref={navRef}
                activeSection={isNavDocked ? activeSection : null}
            />
            <div sx={{ bg: "tint" }}>
                <div
                    id="hook"
                    ref={hookRef}
                    sx={{ height: "120rem", mb: 4, pt: 8 }}
                >
                    <h2>useShowtime() Hook</h2>
                </div>
                <div
                    id="component"
                    ref={componentRef}
                    sx={{ height: "120rem", mb: 4, pt: 8 }}
                >
                    <h2>&lt;Showtime /&gt; component</h2>
                </div>
                <div
                    id="presets"
                    ref={presetsRef}
                    sx={{ height: "120rem", mb: 4, pt: 8 }}
                >
                    <h2>Preset Transitions</h2>
                </div>
            </div>
            <footer>FOOTER</footer>
        </ThemeProvider>
    );
}

export default App;
