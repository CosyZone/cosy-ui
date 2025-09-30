import { defineConfig } from "astro/config";
import path from "path";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import pagefind from "astro-pagefind";
import playformCompress from "@playform/compress";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    base: "./",
    srcDir: "src",
    outDir: "dist",

    prefetch: {
        enabled: false,
    },

    i18n: {
        locales: ["zh-cn", "en"],
        defaultLocale: "zh-cn",
        routing: {
            prefixDefaultLocale: true,
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

    adapter: cloudflare(),
});
