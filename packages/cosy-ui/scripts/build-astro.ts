import { promises as fs } from 'fs';
import fs_extra from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function copySrcToDist(): Promise<void> {
    const srcDir = path.join(rootDir, 'src-astro');
    const distDir = path.join(rootDir, 'dist');
    const astroDistDir = path.join(distDir, 'src-astro');

    try {
        if (!fs_extra.existsSync(srcDir)) {
            throw new Error(`Source directory does not exist: ${srcDir}`);
        }

        // 确保目标目录存在
        await fs_extra.ensureDir(astroDistDir);

        // 复制内容到 dist
        const filter = async (src: string) => {
            return !src.endsWith('app.css');
        };

        await fs_extra.copy(srcDir, astroDistDir, { filter });

        // 复制 index-astro.ts 到 dist
        await fs_extra.copy(path.join(rootDir, 'index-astro.ts'), path.join(distDir, 'index-astro.ts'));

        console.log('✅ 成功复制 Astro 源代码到 dist');
    } catch (error) {
        console.error('❌ 复制 Astro 源代码失败:', error);
        process.exit(1);
    }
}

export async function buildAstro() {
    try {
        await copySrcToDist();
    } catch (error) {
        console.error('❌ 构建 Astro 失败:', error);
        process.exit(1);
    }
}
