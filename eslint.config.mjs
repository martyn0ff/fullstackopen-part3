import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import("eslint").Linter.Config[]} */
export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ["dist/**"],
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      eqeqeq: "error",
      "no-console": "warn",
    },
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
  },
];
