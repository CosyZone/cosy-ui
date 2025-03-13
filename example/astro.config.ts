import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
    integrations: [vue()],
    vite: {
        // @ts-ignore
        plugins: [tailwindcss()],
    },
});
