import { describe, expect, it } from "vitest";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import Badge from "../src/badge/Badge.vue";
import Button from "../src/button/Button.vue";
import Card from "../src/card/Card.vue";
import Text from "../src/text/Text.vue";

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
});
