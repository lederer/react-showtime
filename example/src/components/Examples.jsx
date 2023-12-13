/** @jsx jsx */
import { jsx } from "theme-ui";

import Example from "./Example";
import EXAMPLES from "../examples";

const sx = {
    examples: {
        bg: "tint",
        pb: 8,
    },
    section: {
        mb: 4,
        pb: 8,
    },

    heading: {
        position: "sticky",
        top: "9.2rem",
        bg: "darktint",
        mt: 0,
        mb: 6,
        py: 2,
        fontFamily: "Pompiere, cursive",
        fontSize: "4.4rem",
        textAlign: "center",
        zIndex: 1,
        "@media (max-width: 600px)": {
            fontSize: "3.2rem",
        },
    },
    example: {
        px: 1,
        ":not(:last-of-type)": {
            mb: 8,
        },
    },
};

function Examples({ isHookMode, ...props }) {
    const title = isHookMode ? "useShowtime()" : "<Showtime />";

    return (
        <div sx={sx.examples} {...props}>
            <h3 sx={sx.heading}>{title}</h3>
            {EXAMPLES.map(({ name, desc, hook, component, noInline }, i) => {
                const code = isHookMode ? hook : component;
                return code ? (
                    <Example
                        sx={sx.example}
                        name={name}
                        desc={desc}
                        code={code}
                        noInline={noInline}
                        key={name}
                    />
                ) : null;
            })}
        </div>
    );
}

export default Examples;
