/**
 * 生成主题 CSS 配置的脚本
 * 从 themes.config.ts 读取配置，生成临时 CSS 文件（不修改源码）
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getDaisyUIThemesConfig } from "../src/config/themes.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const appCssPath = join(rootDir, "app.css");
const tempDir = join(rootDir, "temp");
const tempAppCssPath = join(tempDir, "app.css");

/**
 * 生成主题 CSS 配置（生成临时文件，不修改源码）
 */
export async function generateThemeCSS() {
	// 读取源码 app.css（包含占位符，不修改源码）
	const appCss = readFileSync(appCssPath, "utf-8");

	// 检查占位符
	if (!appCss.includes("__THEMES_CONFIG__")) {
		console.error("❌ 错误：在 app.css 中找不到占位符 __THEMES_CONFIG__");
		console.error("   请确保 app.css 中包含：themes: __THEMES_CONFIG__;");
		process.exit(1);
	}

	// 生成 DaisyUI themes 配置
	const daisyUIThemes = getDaisyUIThemesConfig();

	// 确保 temp 目录存在
	mkdirSync(tempDir, { recursive: true });

	// 替换占位符
	let processedCss = appCss.replace("__THEMES_CONFIG__", daisyUIThemes);

	// 修复相对路径：从 temp/ 目录看，需要向上一级才能找到 src/
	// 将 ./src/styles/ 改为 ../src/styles/
	processedCss = processedCss.replace(/\.\/src\//g, "../src/");

	// 写入临时文件（不修改源码）
	writeFileSync(tempAppCssPath, processedCss, "utf-8");
}
