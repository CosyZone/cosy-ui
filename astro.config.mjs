import { defineConfig } from 'astro/config';
import path from 'path';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    base: '/cosy-ui/',
    srcDir: 'docs',
    outDir: 'dist-docs',

    i18n: {
        locales: ['zh-cn', 'en'],
        defaultLocale: 'zh-cn',
        routing: {
            prefixDefaultLocale: true,
        },
    },

    vite: {
        resolve: {
            alias: {
                '@': path.resolve('./src'),
                '@/*': path.resolve('./src/*'),
                '@components': path.resolve('./src/components'),
                '@docs': path.resolve('./docs'),
                '@layouts': path.resolve('./docs/layouts'),
            },
        },

        plugins: [tailwindcss()],
    },

    integrations: [mdx(), vue()],
});
