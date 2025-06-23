import { Application } from './index'
import { ApplicationConfig } from '../types'

/**
 * 创建简单的 Web 应用
 */
export function createWebApp(config?: ApplicationConfig): Application {
    const app = Application.create(config)

    // 添加常用中间件
    // app.use(cors())
    // app.use(logger())
    // app.use(bodyParser())

    return app
}

/**
 * 创建 API 应用
 */
export function createApiApp(config?: ApplicationConfig): Application {
    const app = Application.create({
        ...config,
        name: config?.name || 'API Application'
    })

    // API 特定的中间件和配置
    // app.use(cors({ origin: '*' }))
    // app.use(apiMiddleware())

    return app
}

/**
 * 优雅关闭处理
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
 * 错误处理设置
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
