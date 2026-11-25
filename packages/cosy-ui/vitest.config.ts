import { getViteConfig } from "astro/config";

export default getViteConfig({
	test: {
		include: ["test/**/*.test.ts"],
		environment: "node",
	},
});
