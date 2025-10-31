import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import playformCompress from "@playform/compress";
import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";
import path from "node:path";

// https://astro.build/config
export default defineConfig({
	site: "https://ui.coffic.cn",
	srcDir: "src",
	outDir: "dist",

	prefetch: {
		enabled: false,
	},

	i18n: {
		locales: ["zh-cn", "en"],
		defaultLocale: "en",
		routing: {
			prefixDefaultLocale: false,
			redirectToDefaultLocale: false,
		},
	},

	vite: {
		resolve: {
			alias: {
				"@": path.resolve("./src"),
				"@demos": path.resolve("./src/demos"),
			},
		},
	},

	integrations: [
		mdx(),
		vue(),
		pagefind(),
		playformCompress({
			HTML: {
				"html-minifier-terser": {
					removeAttributeQuotes: true,
					removeComments: true,
				},
			},
		}),
	],

	adapter: cloudflare({
		// 启用平台代理，在本地模拟 Cloudflare 的环境，数据存在 .wrangler/ 目录下
		platformProxy: {
			enabled: true,
		},
		// 'compile' 会在构建时处理图片，导致构建时间过长
		// 'passthrough' 则会跳过构建时的图片处理，将任务交给 Cloudflare 的运行时服务
		imageService: "compile",
	}),
});
