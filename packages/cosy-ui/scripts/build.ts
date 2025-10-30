import { build as viteBuild, type InlineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

/**
 * 复制文件和目录
 */
async function copyFiles() {
	const copies = [
		{ from: "style.ts", to: "dist/style.ts" },
		{ from: "src", to: "dist/src" },
		{ from: "src-astro", to: "dist/src-astro" },
		{ from: "src-vue", to: "dist/src-vue" },
		{ from: "index-astro.ts", to: "dist/index-astro.ts" },
		{ from: "index-vue.ts", to: "dist/index-vue.ts" },
	];

	console.log("📦 开始复制源码文件...");

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

	console.log("✅ 源码文件复制完成");
}

/**
 * 使用 Vite 构建 CSS
 */
async function buildCSS() {
	console.log("🎨 开始构建样式文件...");

	const config: InlineConfig = {
		root: rootDir,
		plugins: [tailwindcss()],
		build: {
			cssCodeSplit: false,
			rollupOptions: {
				input: path.resolve(rootDir, "style.ts"),
				output: {
					assetFileNames: "app.css",
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
		// 1. 清空 dist 目录
		console.log("🧹 清空 dist 目录...");
		await fs.emptyDir(path.resolve(rootDir, "dist"));
		console.log("✅ dist 目录已清空\n");

		// 2. 先构建 CSS（Vite 会使用 dist 目录）
		await buildCSS();

		console.log();

		// 3. 再复制源码文件（避免被 Vite 清空）
		await copyFiles();

		const elapsed = Date.now() - startTime;
		console.log(`\n🎉 构建完成！耗时: ${elapsed}ms`);
	} catch (error) {
		console.error("\n❌ 构建失败:", error);
		process.exit(1);
	}
}

// 执行构建
build();
