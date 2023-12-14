import { resolve } from "path";
import { defineConfig } from "vite";
import eslint from "@rollup/plugin-eslint";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.js"),
            name: "ReactShowtime",
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            plugins: [eslint()],
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/tests/setup.js",
    },
});
