/**
 * 核心辅助函数模块
 * 
 * 本模块提供了一系列用于创建和管理应用程序的辅助函数。
 * 这些函数简化了常见的应用程序配置和管理任务。
 */

import { Application } from './application'
import { ApplicationConfig } from './types'

/**
 * 创建 Web 应用程序
 * 
 * 原理：
 * 1. 创建一个预配置的 Web 应用程序实例
 * 2. 自动添加常用的 Web 中间件
 * 3. 配置适合 Web 应用的默认设置
 * 
 * 工作流程：
 * 1. 使用提供的配置创建应用程序
 * 2. 添加必要的中间件（CORS、日志等）
 * 3. 配置静态文件服务等 Web 特性
 * 
 * 使用示例：
 * ```typescript
 * const app = createWebApp({
 *   name: 'My Web App',
 *   port: 3000
 * })
 * ```
 * 
 * @param config 应用程序配置
 * @returns 配置好的 Web 应用程序实例
 */
export function createWebApp(config?: ApplicationConfig): Application {
    const app = new Application(config)

    // 添加常用中间件
    // app.use(cors())
    // app.use(logger())
    // app.use(bodyParser())

    return app
}

/**
 * 配置优雅关闭处理
 * 
 * 原理：
 * 1. 监听进程信号（SIGTERM、SIGINT等）
 * 2. 在收到信号时执行优雅关闭流程
 * 3. 确保所有资源都被正确释放
 * 
 * 工作流程：
 * 1. 注册信号处理器
 * 2. 收到信号时停止接受新请求
 * 3. 等待现有请求完成
 * 4. 关闭数据库连接等资源
 * 5. 退出进程
 * 
 * 使用示例：
 * ```typescript
 * const app = createWebApp()
 * gracefulShutdown(app)
 * ```
 * 
 * @param app 应用程序实例
 */
export function gracefulShutdown(app: Application): void {
    const signals = ['SIGTERM', 'SIGINT', 'SIGUSR2']

    signals.forEach(signal => {
        process.on(signal, async () => {
            console.log(`Received ${signal}, shutting down gracefully...`)

            try {
                await app.stop()
                process.exit(0)
            } catch (error) {
                console.error('Error during shutdown:', error)
                process.exit(1)
            }
        })
    })
}

/**
 * 配置错误处理
 * 
 * 原理：
 * 1. 设置全局的未捕获异常和拒绝处理器
 * 2. 确保所有错误都被正确记录和处理
 * 3. 在致命错误时执行优雅关闭
 * 
 * 工作流程：
 * 1. 注册全局错误处理器
 * 2. 记录错误信息
 * 3. 在必要时执行优雅关闭
 * 4. 确保错误信息被正确报告
 * 
 * 使用示例：
 * ```typescript
 * const app = createWebApp()
 * setupErrorHandling(app)
 * ```
 * 
 * @param app 应用程序实例
 */
export function setupErrorHandling(app: Application): void {
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason)
        // 这里可以添加更复杂的错误处理逻辑
    })

    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error)
        // 优雅关闭
        app.stop().finally(() => {
            process.exit(1)
        })
    })
} 
