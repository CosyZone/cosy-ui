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
 * @returns {Promise<Application>} 返回启动成功的应用实例，主要用于测试目的
 * @throws {Error} 当服务器启动失败时抛出错误
 */
async function startServer() {
    try {
        console.log('🔄 正在启动服务器...')

        await app.boot()
        await app.start()

        console.log('✅ 服务器启动成功!')
        console.log('🏥 健康检查: http://localhost:3000/health')

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
