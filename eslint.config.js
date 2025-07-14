import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
    tseslint.configs.recommended,
    globalIgnores(
        [
            '**/build/**/*',
            '**/dist/**/*',
            'node_modules/**/*',
            '**/test/**/*',
            '**/out/**/*',
            '**/coverage/**/*',
            '**/logs/**/*',
            '**/temp/**/*',
            '**/.astro/**/*',
        ],
        'Ignore Build Directory'
    ),
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: { ...globals.node, ...globals.browser },
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
        },
    },
]);
