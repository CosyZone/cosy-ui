import { promises as fs } from "fs";
import fs_extra from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

async function copySrcToDist(): Promise<void> {
    const srcDir = path.join(rootDir, "src-vue");
    const distDir = path.join(rootDir, "dist");
    const vueDistDir = path.join(distDir, "src-vue");

    try {
        if (!fs_extra.existsSync(srcDir)) {
            throw new Error(`Source directory does not exist: ${srcDir}`);
        }

        // 确保目标目录存在
        await fs_extra.ensureDir(vueDistDir);

        // 复制 src 目录的内容到 dist，但排除 app.css
        const filter = async (src: string) => {
            return !src.endsWith("app.css");
        };

        await fs_extra.copy(srcDir, vueDistDir, { filter });

        // 复制 index-vue.js 到 dist
        await fs_extra.copy(
            path.join(rootDir, "index.ts"),
            path.join(distDir, "index.ts"),
        );

        console.log("✅ 复制 vue 源代码");
    } catch (error) {
        console.error("❌ 复制 vue 源码失败:", error);
        process.exit(1);
    }
}

export async function buildVue() {
    try {
        await copySrcToDist();
    } catch (error) {
        console.error("❌ 复制 vue 源码失败:", error);
        process.exit(1);
    }
}
