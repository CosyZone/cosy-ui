import { describe, expect, it } from "vitest";
import * as Cosy from "../index";

describe("cosy-ui-vue public exports", () => {
	it("exports the image helpers consumers depend on", () => {
		expect(typeof Cosy.getExampleImage).toBe("function");
		expect(typeof Cosy.getProductImage).toBe("function");
		expect(typeof Cosy.getAvatarImage).toBe("function");
		expect(typeof Cosy.getLandscapeImage).toBe("function");
		expect(Cosy.getExampleImage({ width: 100, height: 100 })).toContain("http");
	});

	it("exports shared utilities", () => {
		expect(typeof Cosy.LinkUtil).toBe("function");
		expect(typeof Cosy.LangPackage).toBe("function");
		expect(typeof Cosy.processSocialLink).toBe("function");
	});

	it("exports core components", () => {
		const components = [
			"Alert",
			"AlertDialog",
			"ApplePhone",
			"Avatar",
			"Badge",
			"BannerBox",
			"Button",
			"Card",
			"Container",
			"Grid",
			"Heading",
			"Login",
			"ProductCard",
			"Text",
		];
		for (const name of components) {
			expect(Cosy, `missing export: ${name}`).toHaveProperty(name);
		}
	});
});
