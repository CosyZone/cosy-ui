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
 * 复制组件源码
 */
async function copyComponents() {
	const copies = [
		{ from: "src", to: "dist/src" },
		{ from: "index.ts", to: "dist/index.ts" },
	];

	console.log("📦 开始复制组件源码...");

	await Promise.all(
		copies.map(async ({ from, to }) => {
			const srcPath = path.resolve(rootDir, from);
			const destPath = path.resolve(rootDir, to);

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
async function buildCSS() {
	console.log("🎨 构建样式文件...");

	const tempDir = path.resolve(rootDir, "temp", "src");
	fs.ensureDirSync(tempDir);
	const tempStylePath = path.resolve(tempDir, "style.ts");
	writeFileSync(tempStylePath, 'import "./app.css";', "utf-8");

	const config: InlineConfig = {
		root: rootDir,
		plugins: [tailwindcss()],
		build: {
			emptyOutDir: false,
			cssCodeSplit: false,
			rollupOptions: {
				input: tempStylePath,
				output: {
					assetFileNames: "src/app.css",
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
	console.log("🚀 开始构建 @coffic/cosy-ui-vue...\n");

	try {
		console.log("🎨 生成主题 CSS 配置...");
		await generateThemeCSS();
		console.log("✅ 主题 CSS 配置已生成\n");

		console.log("🧹 清空 dist 目录...");
		await fs.emptyDir(path.resolve(rootDir, "dist"));
		console.log("✅ dist 目录已清空\n");

		await buildCSS();
		console.log();

		await copyComponents();

		const elapsed = Date.now() - startTime;
		console.log(`\n🎉 构建完成！耗时: ${elapsed}ms`);
	} catch (error) {
		console.error("\n❌ 构建失败:", error);
		process.exit(1);
	}
}

build();