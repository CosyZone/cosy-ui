import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cleanupDist() {
    try {
        const distPath = path.resolve(__dirname, "../dist");

        // 复制 style.ts 到 dist
        await fs.copyFile(
            path.join(__dirname, "../style.ts"),
            path.join(distPath, "style.ts"),
        );

        console.log("✅ 样式处理完成");
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
