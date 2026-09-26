/**
 * 生成主题 CSS 配置的脚本
 * 从 themes.config.ts 读取配置，生成临时 CSS 文件（不修改源码）
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getDaisyUIThemesConfig as getAstroThemesConfig } from "../src-astro/internal/config/themes.config.js";
import { getDaisyUIThemesConfig as getVueThemesConfig } from "../src-vue/internal/config/themes.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const tempDir = join(rootDir, "temp");

/**
 * 生成主题 CSS 配置（生成临时文件，不修改源码）
 */
export async function generateThemeCSS() {
	const platforms = [
		{ name: "src-astro", getThemesConfig: getAstroThemesConfig },
		{ name: "src-vue", getThemesConfig: getVueThemesConfig },
	];

	for (const { name, getThemesConfig } of platforms) {
		const appCssPath = join(rootDir, name, "app.css");
		const appCss = readFileSync(appCssPath, "utf-8");
		if (!appCss.includes("__THEMES_CONFIG__")) {
			throw new Error(`${name}/app.css is missing __THEMES_CONFIG__`);
		}

		const platformTempDir = join(tempDir, name);
		mkdirSync(platformTempDir, { recursive: true });

		// CSS source lives in temp/<platform>; point style imports back to the
		// corresponding platform-local implementation in the package.
		const processedCss = appCss
			.replace("__THEMES_CONFIG__", getThemesConfig())
			.replace(/\.\/internal\//g, `../../${name}/internal/`);
		writeFileSync(join(platformTempDir, "app.css"), processedCss, "utf-8");
	}
}
