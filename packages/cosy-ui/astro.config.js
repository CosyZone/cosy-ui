// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';

// https://astro.build/config
export default defineConfig({
	base: '/cosy-ui/',
	srcDir: 'docs',
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
});
