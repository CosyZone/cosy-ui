// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  base: '/cosy-ui/',
  srcDir: 'src',

  i18n: {
      locales: ['zh-cn', 'en'],
      defaultLocale: 'en',
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
              '@utils': path.resolve('./src/utils'),
              '@paths': path.resolve('./src/paths'),
              '@database': path.resolve('./src/database'),
              '@models': path.resolve('./src/models'),
              '@layouts': path.resolve('./src/layouts'),
          },
      },
  },

  integrations: [mdx()],
});