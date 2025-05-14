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
                '@docs': path.resolve('./docs'),
                '@cosy': path.resolve('./src'),
            },
        },

        plugins: [tailwindcss()],
    },

    integrations: [mdx(), vue()],
});
