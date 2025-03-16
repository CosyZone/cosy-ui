import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";
import { defineConfig } from "astro/config";
import { integration } from "@coffic/cosy-ui";

// https://astro.build/config
export default defineConfig({
	base: '/cosy-ui/',
	integrations: [
		integration(),
		// hmrIntegration({
		// 	directory: createResolver(import.meta.url).resolve("../packages/cosy-ui/src"),
		// }),
	],
});
