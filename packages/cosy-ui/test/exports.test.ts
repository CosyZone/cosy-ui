import { describe, expect, it } from "vitest";
import * as Cosy from "../index";

describe("cosy-ui public exports", () => {
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
		expect(typeof Cosy.getBackgroundClass).toBe("function");
		expect(typeof Cosy.getBorderClass).toBe("function");
		expect(typeof Cosy.MAC_WINDOW_BG_CONFIGS).toBe("object");
	});

	it("exports core components", () => {
		const components = [
			"Alert",
			"AlertDialog",
			"AppHeader",
			"AppLayout",
			"Avatar",
			"Badge",
			"Banner",
			"Button",
			"Card",
			"Container",
			"DashboardLayout",
			"Footer",
			"Grid",
			"Header",
			"Heading",
			"Image",
			"NavSection",
			"Sidebar",
			"Text",
		];
		for (const name of components) {
			expect(Cosy, `missing export: ${name}`).toHaveProperty(name);
		}
	});
});
