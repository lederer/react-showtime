/** @jsx jsx */
import { jsx } from "theme-ui";
import { ThemeProvider } from "theme-ui";

import Header from "./components/Header";
import About from "./components/About";
import Nav from "./components/Nav";
import theme from "./theme";

const sx = {
    header: {
        mb: 2,
    },
    about: {
        maxWidth: "70em",
        mx: "auto",
        mb: 3,
    },
    nav: {},
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Header sx={sx.header} />
            <About sx={sx.about} />
            <Nav sx={sx.nav} />
            <div id="hook" sx={{ height: "120rem", bg: "#fd7c8317", mb: 4 }} />
            <div
                id="component"
                sx={{ height: "120rem", bg: "#fd7c8317", mb: 4 }}
            />
            <div
                id="presets"
                sx={{ height: "120rem", bg: "#fd7c8317", mb: 4 }}
            />
        </ThemeProvider>
    );
}

export default App;
