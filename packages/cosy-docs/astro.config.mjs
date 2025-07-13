import { defineConfig } from 'astro/config';
import path from 'path';
import mdx from '@astrojs/mdx';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  base: '/cosy-ui/',
  srcDir: 'src',
  outDir: 'dist',

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
      },
    },
  },

  integrations: [mdx(), vue()],
});
