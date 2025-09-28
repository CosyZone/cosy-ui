import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cleanupDist() {
	try {
		const distPath = path.resolve(__dirname, "../dist");
		const files = await fs.readdir(distPath);

		// 清理除了 app.css 之外的所有文件和目录
		for (const file of files) {
			const filePath = path.join(distPath, file);
			const stat = await fs.stat(filePath);

			if (stat.isDirectory()) {
				await fs.rm(filePath, { recursive: true });
			} else if (file !== "app.css") {
				await fs.unlink(filePath);
			}
		}

		console.log("✅ 清理完成：只保留了 app.css（只需要构建好的 app.css 文件）");

		// 复制 style.ts 到 dist
		await fs.copyFile(
			path.join(__dirname, "../style.ts"),
			path.join(distPath, "style.ts"),
		);
	} catch (error) {
		console.error("❌ 清理失败:", error);
		process.exit(1);
	}
}

export async function buildStyle() {
	try {
		await cleanupDist();
	} catch (error) {
		console.error("❌ 后处理任务失败:", error);
		process.exit(1);
	}
}
