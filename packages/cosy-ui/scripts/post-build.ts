import { promises as fs } from 'fs';
import fs_extra from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function cleanupDist() {
  try {
    const distPath = path.resolve(__dirname, '../dist');
    const files = await fs.readdir(distPath);

    // 清理除了 app.css 之外的所有文件和目录
    for (const file of files) {
      const filePath = path.join(distPath, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        await fs.rm(filePath, { recursive: true });
      } else if (file !== 'app.css') {
        await fs.unlink(filePath);
      }
    }

    console.log('✅ 清理完成：只保留了 app.css（只需要构建好的 app.css 文件）');
  } catch (error) {
    console.error('❌ 清理失败:', error);
    process.exit(1);
  }
}

async function copySrcToDist(): Promise<void> {
  const srcDir = path.join(rootDir, 'src');
  const distDir = path.join(rootDir, 'dist');

  try {
    if (!fs_extra.existsSync(srcDir)) {
      throw new Error(`Source directory does not exist: ${srcDir}`);
    }

    // 确保目标目录存在
    await fs_extra.ensureDir(distDir);

    // 复制 src 目录的内容到 dist，但排除 app.css
    const filter = async (src: string) => {
      return !src.endsWith('app.css');
    };

    await fs_extra.copy(srcDir, distDir, { filter });
    console.log('✅ 成功复制 src 内容到 dist（已排除 app.css）');
  } catch (error) {
    console.error('❌ 复制失败:', error);
    process.exit(1);
  }
}

async function postBuild() {
  try {
    await cleanupDist();
    await copySrcToDist();
  } catch (error) {
    console.error('❌ 后处理任务失败:', error);
    process.exit(1);
  }
}

postBuild();
