import { describe, expect, it } from "vitest";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import Badge from "../src/Badge.vue";
import Button from "../src/Button.vue";
import Card from "../src/Card.vue";
import Login from "../src/Login.vue";
import Text from "../src/Text.vue";

describe("cosy-ui-vue server rendering", () => {
	it("renders Button with its BEM root class and slot", async () => {
		const html = await renderToString(
			createSSRApp({
				render: () => h(Button, { variant: "primary" }, () => "Click me"),
			}),
		);
		expect(html).toContain("cosy-btn");
		expect(html).toContain("cosy-btn--primary");
		expect(html).toContain("Click me");
	});

	it("renders Badge content", async () => {
		const html = await renderToString(
			createSSRApp({ render: () => h(Badge, null, () => "New") }),
		);
		expect(html).toContain("New");
	});

	it("renders Text content", async () => {
		const html = await renderToString(
			createSSRApp({ render: () => h(Text, null, () => "Hello") }),
		);
		expect(html).toContain("Hello");
	});

	it("renders Card with slot content", async () => {
		const html = await renderToString(
			createSSRApp({ render: () => h(Card, null, () => "Card body") }),
		);
		expect(html).toContain("Card body");
	});

	it("keeps Login layout and social button classes", async () => {
		const html = await renderToString(
			createSSRApp({
				render: () =>
					h(Login, { socialLogins: ["github", "google"] }),
			}),
		);
		expect(html).toContain(
			"cosy:min-h-screen cosy:flex cosy:items-center cosy:justify-center cosy:bg-base-200 cosy:py-12 cosy:px-4 cosy:sm:px-6 cosy:lg:px-8",
		);
		expect(html).toContain("cosy:mt-6 cosy:grid cosy:gap-3 cosy:grid-cols-2");
		expect(html).toContain("cosy:bg-gray-800 cosy:hover:bg-gray-900");
	});
});
