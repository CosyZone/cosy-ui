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
			output: {
				assetFileNames: "app.css",
			},
		},
		cssCodeSplit: false,
		outDir: "dist",
	},
});
