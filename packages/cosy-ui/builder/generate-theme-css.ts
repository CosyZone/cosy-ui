/**
 * 生成主题 CSS 配置的脚本
 * 从 themes.config.ts 读取配置，生成临时 CSS 文件（不修改源码）
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getDaisyUIThemesConfig } from "../src-astro/internal/config/themes.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const tempDir = join(rootDir, "temp", "src-astro");

export async function generateThemeCSS() {
	const appCssPath = join(rootDir, "src-astro", "app.css");
	const appCss = readFileSync(appCssPath, "utf-8");
	if (!appCss.includes("__THEMES_CONFIG__")) {
		throw new Error("src-astro/app.css is missing __THEMES_CONFIG__");
	}

	mkdirSync(tempDir, { recursive: true });

	// CSS source lives in temp/src-astro; point style imports back to the
	// package-local implementation.
	const processedCss = appCss
		.replace("__THEMES_CONFIG__", getDaisyUIThemesConfig())
		.replace(/\.\/internal\//g, "../../src-astro/internal/");
	writeFileSync(join(tempDir, "app.css"), processedCss, "utf-8");
}