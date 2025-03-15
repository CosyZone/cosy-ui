import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import path from 'path';

// https://astro.build/config
export default defineConfig({
    // 设置基础路径为仓库名，这里使用 cosy-ui
    base: '/cosy-ui',
    // 设置输出模式为静态网站
    output: 'static',
    srcDir: './example/src',

    integrations: [vue()],

    vite: {
        server: {
            hmr: {
                overlay: false,
            },
        },

        resolve: {
            alias: {
                '~': path.resolve('./'),
                '~/*': path.resolve('./*'),
            },
        },
    },
});
