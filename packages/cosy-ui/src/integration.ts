import { defineIntegration } from "astro-integration-kit";

export const integration = defineIntegration({
	name: "astro-cosy",
	setup() {
		return {
			hooks: {
				"astro:config:setup": ({ logger }) => {
					logger.info("astro-cosy integration setup");
				},
			},
		};
	},
});
