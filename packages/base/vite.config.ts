import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		tailwindcss(),
		dts({
			insertTypesEntry: true,
			rollupTypes: true,
			include: ["index.ts", "src/**/*"],
			exclude: ["**/*.test.ts", "**/*.spec.ts"],
		}),
	],
	build: {
		lib: {
			entry: {
				index: resolve(__dirname, "index.ts"),
				style: resolve(__dirname, "style.ts"),
			},
			formats: ["es"],
			fileName: (format, entryName) => `${entryName}.js`,
		},
		rollupOptions: {
			external: ["@remixicon/vue", "fs-extra", "html-to-image", "shiki"],
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name === "style.css") {
						return "cosy-ui-base.css";
					}
					return assetInfo.name || "asset";
				},
			},
		},
		cssCodeSplit: false,
		outDir: "dist",
	},
});
