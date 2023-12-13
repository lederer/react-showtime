/** @jsxImportSource theme-ui */
import { ThemeUIProvider, Global } from "theme-ui";
import { useState } from "react";

import Header from "./components/Header";
import About from "./components/About";
import Toggle from "./components/Toggle";
import Examples from "./components/Examples";
import Footer from "./components/Footer";
import theme from "./theme";

const sx = {
    header: {
        mb: 2,
        zIndex: 2,
    },
    about: {
        maxWidth: "110ch",
        mx: "auto",
        mb: 4,
    },
    toggle: {
        "@media (min-width: 900px)": {
            alignSelf: "center",
        },
        zIndex: 2,
    },
    examples: {
        zIndex: 1,
    },
};

function App() {
    const [isHookMode, setIsHookMode] = useState(true);

    return (
        <ThemeUIProvider theme={theme}>
            <Global
                styles={{
                    body: {
                        fontSize: 4,
                        "@media (max-width: 400px)": {
                            fontSize: 3,
                        },
                    },
                    a: {
                        textDecoration: "none",
                        color: "accent",
                    },
                }}
            />
            <Header sx={sx.header} />
            <About sx={sx.about} />
            <Toggle
                sx={sx.toggle}
                isHookMode={isHookMode}
                setIsHookMode={setIsHookMode}
            />
            <Examples sx={sx.examples} isHookMode={isHookMode} />
            <Footer />
        </ThemeUIProvider>
    );
}

export default App;
