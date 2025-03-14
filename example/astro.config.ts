import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
	// 设置基础路径为仓库名，这里使用 cosy-ui
	base: '/cosy-ui',
	// 设置输出模式为静态网站
	output: 'static',
	integrations: [vue()],
	vite: {
		// @ts-ignore
		plugins: [tailwindcss()],
	},
});
