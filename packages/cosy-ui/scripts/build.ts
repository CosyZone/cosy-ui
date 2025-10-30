import tailwindcss from "@tailwindcss/vite";
import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { type InlineConfig, build as viteBuild } from "vite";

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

/**
 * 复制 Astro 和 Vue 组件（保留源码）
 * 同时复制 src 目录下的静态资源（图片、CSS等非TS文件）
 */
async function copyComponents() {
	const copies = [
		{ from: "src-astro", to: "dist/src-astro" },
		{ from: "src-vue", to: "dist/src-vue" },
		{ from: "index-astro.ts", to: "dist/index-astro.ts" },
		{ from: "index-vue.ts", to: "dist/index-vue.ts" },
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

	// 复制 src 目录下的静态资源（图片、CSS等非TS文件）
	// tsc 只编译 TS 文件，不会复制其他资源
	console.log("📦 复制静态资源...");
	const srcDir = path.resolve(rootDir, "src");
	const distSrcDir = path.resolve(rootDir, "dist/src");

	await fs.copy(srcDir, distSrcDir, {
		filter: (src) => {
			// 只复制非 TS 文件（图片、CSS 等）
			// TS 文件已经由 tsc 编译成 JS 和 .d.ts
			return !src.endsWith(".ts") || src.includes("node_modules");
		},
		overwrite: false, // 不覆盖 tsc 生成的文件
	});

	console.log("  ✅ 静态资源复制完成");
	console.log("✅ 组件源码复制完成");
}

/**
 * 使用 tsc 编译纯 TS 代码（src/ 目录）
 * tsc 会完全保持目录结构：src/utils/image.ts → dist/src/utils/image.js
 */
async function buildTypeScript() {
	console.log("⚙️  开始编译 TypeScript 代码...");

	try {
		// 使用 tsc 编译，保持目录结构
		await execAsync("tsc --project tsconfig.build.json");
		console.log("✅ TypeScript 编译完成");
	} catch (error) {
		console.error("❌ TypeScript 编译失败:", error);
		throw error;
	}
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
			emptyOutDir: false, // 不清空 dist，避免删除 tsup 生成的文件
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

		// 2. 并行执行：CSS 构建 + TS 编译
		await Promise.all([buildCSS(), buildTypeScript()]);

		console.log();

		// 3. 复制组件源码（Astro/Vue）
		await copyComponents();

		const elapsed = Date.now() - startTime;
		console.log(`\n🎉 构建完成！耗时: ${elapsed}ms`);
	} catch (error) {
		console.error("\n❌ 构建失败:", error);
		process.exit(1);
	}
}

// 执行构建
build();
