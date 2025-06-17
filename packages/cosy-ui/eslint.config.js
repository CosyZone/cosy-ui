import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";


export default defineConfig([
    globalIgnores(['build/**/*'], 'Ignore build directory'),
    globalIgnores(['dist/**/*', 'dist-docs/**/*'], 'Ignore dist directory'),
    globalIgnores(['.astro/**/*'], 'Ignore astro directory'),
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: { globals: { ...globals.browser, ...globals.node } }
    },
    tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
]);
