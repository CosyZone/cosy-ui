import { defineConfig } from 'astro/config';
import path from 'path';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  base: '/cosy-ui/',
  srcDir: 'docs',
  outDir: './dist-docs',

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
              '@utils': path.resolve('./src/utils'),
              '@paths': path.resolve('./src/paths'),
              '@database': path.resolve('./src/database'),
              '@models': path.resolve('./src/models'),
              '@layouts': path.resolve('./src/layouts'),
          },
      },

      plugins: [tailwindcss()],
  },

  integrations: [mdx()],
});