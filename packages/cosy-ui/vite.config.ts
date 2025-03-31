import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { exec } from 'child_process'
import { createLogger } from 'vite'

export default defineConfig({
    plugins: [
        // @ts-ignore
        tailwindcss(),
        {
            name: 'post-build',
            apply: 'build',
            closeBundle: {
                order: 'post',
                async handler() {
                    const logger = createLogger() // 直接使用已导入的logger

                    logger.info('✅ 构建完成，开始执行post-build脚本...')
                    try {
                        const { exec } = await import('child_process');
                        const { stdout, stderr } = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
                            exec('tsx scripts/post-build.ts', (error, stdout, stderr) => {
                                if (error) reject(error);
                                resolve({ stdout, stderr });
                            });
                        });

                        if (stdout) logger.info(stdout);
                        if (stderr) console.warn(stderr);
                        logger.info('🎉 post-build脚本执行完成');
                    } catch (error) {
                        console.error('❌ post-build脚本执行失败:', error);
                    }
                }
            }
        }
    ],
    build: {
        cssCodeSplit: false,
        rollupOptions: {
            input: 'src/style.ts',
            output: {
                assetFileNames: 'app.css'
            }
        }
    }
});
