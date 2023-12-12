import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import eslint from "@rollup/plugin-eslint";

import pkg from "./package.json" assert { type: "json" };

export default {
    input: "src/index.js",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: "es",
            sourcemap: true,
        },
    ],
    external: ["react", "react-dom"],
    plugins: [
        url({ exclude: ["**/*.svg"] }),
        eslint(),
        babel({
            exclude: "node_modules/**",
            babelHelpers: "bundled",
        }),
        commonjs(),
        nodeResolve({ browser: true }),
    ],
};
