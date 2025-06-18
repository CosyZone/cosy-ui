module.exports = {
    root: true,
    extends: ['astro'],
    parser: 'astro-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
    }
}; 
