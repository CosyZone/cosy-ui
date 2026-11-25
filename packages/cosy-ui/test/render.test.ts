import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Badge from "../src-astro/Badge.astro";
import Button from "../src-astro/Button.astro";
import Card from "../src-astro/Card.astro";
import Container from "../src-astro/Container.astro";
import Heading from "../src-astro/Heading.astro";
import MathFormula from "../src-astro/MathFormula.astro";
import TableOfContents from "../src-astro/TableOfContents.astro";
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

	it("keeps MathFormula base and variant classes", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(MathFormula, {
			props: { title: "勾股定理", variant: "default" },
			slots: { default: "a² + b² = c²" },
		});
		expect(html).toContain("formula-container");
		expect(html).toContain(
			"cosy:my-6 cosy:p-4 cosy:rounded-lg cosy:relative cosy:transition-all cosy:duration-300",
		);
		expect(html).toContain(
			"cosy:bg-base-200/80 cosy:border-l-2 cosy:border-accent cosy:rounded-r-lg cosy:shadow cosy:hover:shadow-lg",
		);
	});

	it("keeps TableOfContents aside classes", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(TableOfContents, {
			props: { fixed: false },
		});
		expect(html).toContain(
			"cosy:hidden cosy:xl:block cosy:w-64 cosy:pr-3 cosy:shrink-0",
		);
		expect(html).toContain("cosy:w-full cosy:max-w-xs");
	});
});
