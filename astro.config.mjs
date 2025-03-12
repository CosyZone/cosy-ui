import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [vue(), tailwind()],
  outDir: './dist',
  build: {
    format: 'file',
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['astro', 'vue', '@astrojs/vue'],
      },
    },
  },
});
