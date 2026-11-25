import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Badge from "../src-astro/Badge.astro";
import Button from "../src-astro/Button.astro";
import Card from "../src-astro/Card.astro";
import Container from "../src-astro/Container.astro";
import Heading from "../src-astro/Heading.astro";
import Text from "../src-astro/Text.astro";

describe("cosy-ui server rendering", () => {
	it("renders Button with its BEM root class", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(Button, {
			props: { variant: "primary" },
			slots: { default: "Click me" },
		});
		expect(html).toContain("cosy-btn");
		expect(html).toContain("cosy-btn--primary");
		expect(html).toContain("Click me");
	});

	it("renders Badge content", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(Badge, {
			slots: { default: "New" },
		});
		expect(html).toContain("New");
	});

	it("renders Container with slot content", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(Container, {
			slots: { default: "Body" },
		});
		expect(html).toContain("cosy-container");
		expect(html).toContain("Body");
	});

	it("renders Heading with requested level", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(Heading, {
			props: { level: 2 },
			slots: { default: "Title" },
		});
		expect(html).toContain("<h2");
		expect(html).toContain("Title");
	});

	it("renders Text and Card", async () => {
		const container = await AstroContainer.create();
		const text = await container.renderToString(Text, {
			slots: { default: "Hello" },
		});
		expect(text).toContain("Hello");

		const card = await container.renderToString(Card, {
			slots: { default: "Card body" },
		});
		expect(card).toContain("Card body");
	});
});
