import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";
import { defineConfig } from "astro/config";

const { default: cosyUI } = await import("@coffic/cosy-ui");

// https://astro.build/config
export default defineConfig({
	integrations: [
		cosyUI(),
		hmrIntegration({
			directory: createResolver(import.meta.url).resolve("../packages/cosy-ui/src"),
		}),
	],
});
