import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import { eslint } from "rollup-plugin-eslint";

import pkg from "./package.json";

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
    plugins: [
        external(),
        url({ exclude: ["**/*.svg"] }),
        eslint(),
        babel({
            exclude: "node_modules/**",
            babelHelpers: "bundled",
        }),
        resolve({ browser: true }),
        commonjs(),
    ],
};
