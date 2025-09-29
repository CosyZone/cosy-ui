import { promises as fs } from "fs";
import fs_extra from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

async function copySrcToDist(): Promise<void> {
	const srcDir = path.join(rootDir, "src");
	const distDir = path.join(rootDir, "dist");
	const srcDistDir = path.join(distDir, "src");

	try {
		if (!fs_extra.existsSync(srcDir)) {
			throw new Error(`Source directory does not exist: ${srcDir}`);
		}

		// 确保目标目录存在
		await fs_extra.ensureDir(srcDistDir);

		// 复制内容到 dist
		const filter = async (src: string) => {
			return !src.endsWith("app.css");
		};

		await fs_extra.copy(srcDir, srcDistDir, { filter });

		console.log("✅ 成功复制 src 源代码到 dist");
	} catch (error) {
		console.error("❌ 复制 src 源代码失败:", error);
		process.exit(1);
	}
}

export async function buildSrc() {
	try {
		await copySrcToDist();
	} catch (error) {
		console.error("❌ 构建 src 失败:", error);
		process.exit(1);
	}
}
