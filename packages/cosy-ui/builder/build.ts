import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs-extra";
import { type InlineConfig, build as viteBuild } from "vite";
import { generateThemeCSS } from "./generate-theme-css";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

/**
 * 复制 Astro 组件源码
 */
async function copyComponents() {
	const copies = [
		{ from: "src-astro", to: "dist/src-astro" },
		{ from: "index-astro.ts", to: "dist/index-astro.ts" },
	];

	console.log("📦 开始复制组件源码...");

	await Promise.all(
		copies.map(async ({ from, to }) => {
			const srcPath = path.resolve(rootDir, from);
			const destPath = path.resolve(rootDir, to);

			// 检查源文件/目录是否存在
			if (!(await fs.pathExists(srcPath))) {
				console.warn(`⚠️  源路径不存在，跳过: ${from}`);
				return;
			}

			await fs.copy(srcPath, destPath, {
				filter: (src) => !src.endsWith("app.css"),
			});

			console.log(`  ✅ ${from} → ${to}`);
		}),
	);

	console.log("✅ 组件源码复制完成");
}

/**
 * 使用 Vite 构建 CSS
 */
async function buildCSS(platform: "src-astro" = "src-astro") {
	console.log(`🎨 构建 ${platform} 样式文件...`);

	// 每个平台使用自己的入口样式和本地 CSS 文件。
	const tempDir = path.resolve(rootDir, "temp", platform);
	// 确保 temp 目录存在
	fs.ensureDirSync(tempDir);
	const tempStylePath = path.resolve(tempDir, "style.ts");
	const tempStyleContent = 'import "./app.css";';
	writeFileSync(tempStylePath, tempStyleContent, "utf-8");

	const config: InlineConfig = {
		root: rootDir,
		plugins: [tailwindcss()],
		build: {
			emptyOutDir: false, // 不清空 dist，避免删除 tsup 生成的文件
			cssCodeSplit: false,
			rollupOptions: {
				input: tempStylePath,
				output: {
					assetFileNames: `${platform}/app.css`,
				},
			},
		},
	};

	await viteBuild(config);

	console.log("✅ 样式文件构建完成");
}

/**
 * 主构建函数
 */
async function build() {
	const startTime = Date.now();
	console.log("🚀 开始构建 cosy-ui...\n");

	try {
		// 1. 生成临时主题 CSS（从 themes.config.ts 读取配置，不修改源码）
		console.log("🎨 生成主题 CSS 配置...");
		await generateThemeCSS();
		console.log("✅ 主题 CSS 配置已生成\n");

		// 2. 清空 dist 目录
		console.log("🧹 清空 dist 目录...");
		await fs.emptyDir(path.resolve(rootDir, "dist"));
		console.log("✅ dist 目录已清空\n");

		// 3. 构建 Astro 平台本地样式，产物由入口导入
		await buildCSS("src-astro");

		console.log();

		// 4. 复制组件源码（Astro/Vue）
		await copyComponents();

		const elapsed = Date.now() - startTime;
		console.log(`\n🎉 构建完成！耗时: ${elapsed}ms`);
	} catch (error) {
		console.error("\n❌ 构建失败:", error);
		process.exit(1);
	}
}

build();
