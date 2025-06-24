/**
 * @file server.ts
 * @description 服务器启动入口文件，负责引导应用程序的启动过程
 * 
 * 该文件主要职责：
 * 1. 启动应用程序
 * 2. 处理启动过程中的错误
 */

import { app } from './app'

/**
 * 启动服务器的主函数
 * @description 负责启动应用程序并处理启动过程中的错误
 * @throws {Error} 当服务器启动失败时抛出错误
 */
async function startServer() {
    try {
        await app.boot()
        await app.start()

        return app
    } catch (error) {
        console.error('❌ 服务器启动失败:', error)
        process.exit(1)
    }
}

// 如果直接运行此文件，启动服务器
if (require.main === module) {
    startServer()
}

export { startServer } 
