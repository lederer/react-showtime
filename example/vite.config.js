import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
    return {
        build: {
            outDir: "build",
        },
        plugins: [react({ jsxImportSource: "theme-ui" }), svgr()],
    };
});
