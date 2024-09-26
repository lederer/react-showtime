import js from "@eslint/js";
import react from "@eslint-react/eslint-plugin";
import * as tsParser from "@typescript-eslint/parser";

export default [
    js.configs.recommended,
    {
      files: ["**/*.{js,jsx}"],
      ...react.configs.recommended,
      languageOptions: {
        parser: tsParser,
      },
      rules: {
        "no-console": "error",
        "no-undef": "warn"
      }
    },
    {
      files: ["example/**/*.{js,jsx}"],
      settings: {
        "react-x": {
          importSource: "theme-ui"
        }
      },
    }
];
