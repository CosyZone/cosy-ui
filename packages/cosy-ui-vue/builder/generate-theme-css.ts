/**
 * 生成主题 CSS 配置的脚本
 * 从 themes.config.ts 读取配置，生成临时 CSS 文件（不修改源码）
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getDaisyUIThemesConfig } from "../src/internal/config/themes.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const tempDir = join(rootDir, "temp", "src");

export async function generateThemeCSS() {
	const appCssPath = join(rootDir, "src", "app.css");
	const appCss = readFileSync(appCssPath, "utf-8");
	if (!appCss.includes("__THEMES_CONFIG__")) {
		throw new Error("src/app.css is missing __THEMES_CONFIG__");
	}

	mkdirSync(tempDir, { recursive: true });

	// CSS source lives in temp/; point style imports back to the package's src/.
	const processedCss = appCss
		.replace("__THEMES_CONFIG__", getDaisyUIThemesConfig())
		.replace(/\.\/internal\//g, "../../src/internal/");
	writeFileSync(join(tempDir, "app.css"), processedCss, "utf-8");
}