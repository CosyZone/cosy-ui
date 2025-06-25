import { Configuration } from '@coffic/cosy-config'
import { ServiceContainer } from '@coffic/cosy-container'
import { Pipeline } from '@coffic/cosy-middleware'
import { Router } from '@coffic/cosy-router'
import { Logger } from '@coffic/cosy-logger'
import { IConfigManager, IContainer, IRouter, ILogger, LogLevel } from '@coffic/cosy-interfaces'
import { WebApplication, WebApplicationDependencies } from './web/web-app.js'
import { ApplicationConfig } from './types.js'

import { CommanderApp } from './cli/commander-app.js'

/**
 * 应用程序工厂类
 * 
 * 负责创建和初始化应用程序实例及其依赖。
 * 提供了默认的依赖实现，同时允许自定义依赖。
 */
export class ApplicationFactory {
    /**
     * 创建配置管理器
     */
    protected static createConfigManager(): IConfigManager {
        return new Configuration()
    }

    /**
     * 创建服务容器
     */
    protected static createContainer(): IContainer {
        return new ServiceContainer()
    }

    /**
     * 创建路由器
     */
    protected static createRouter(): IRouter {
        return new Router()
    }

    /**
     * 创建日志记录器
     * @param appType 应用程序类型，用于区分不同的日志记录器配置
     */
    protected static createLogger(appType: 'web' | 'cli' = 'web'): ILogger {
        const baseConfig = {
            pretty: true, // 开发环境下默认美化输出
            timestamp: false,
            context: {
                source: 'framework' // 标记这是框架日志
            }
        }

        if (appType === 'cli') {
            return new Logger({
                ...baseConfig,
                level: LogLevel.WARN, // CLI 应用默认只显示警告和错误
                prefix: '🔧', // CLI 应用程序前缀
                context: {
                    ...baseConfig.context,
                    type: 'cli'
                }
            })
        }

        return new Logger({
            ...baseConfig,
            level: LogLevel.DEBUG, // Web 应用保持调试级别
            prefix: '💤', // Web 应用程序前缀
            context: {
                ...baseConfig.context,
                type: 'web'
            }
        })
    }

    /**
     * 创建默认依赖
     */
    protected static createDefaultDependencies(): WebApplicationDependencies {
        const logger = ApplicationFactory.createLogger('web')
        const pipelineLogger = logger.child('pipeline', { component: 'pipeline' })
        const pipeline = new Pipeline([], { logger: pipelineLogger })

        return {
            config: ApplicationFactory.createConfigManager(),
            container: ApplicationFactory.createContainer(),
            router: ApplicationFactory.createRouter(),
            pipeline,
            logger
        }
    }

    /**
     * 创建应用程序实例
     * 
     * @param config 应用程序配置
     * @param customDependencies 自定义依赖
     * @returns Application 实例
     */
    static create(
        config: ApplicationConfig = {},
        customDependencies: Partial<WebApplicationDependencies> = {}
    ): WebApplication {
        // 合并默认依赖和自定义依赖
        const dependencies = {
            ...ApplicationFactory.createDefaultDependencies(),
            ...customDependencies
        }

        return new WebApplication(config, dependencies)
    }

    /**
     * 创建 API 应用程序
     * 
     * @example
     * ```typescript
     * const app = ApplicationFactory.createApiApp({
     *   name: 'My API',
     *   port: 3000
     * });
     * ```
     * 
     * @param config 应用程序配置
     * @param customDependencies 自定义依赖
     * @returns API Application 实例
     */
    static createApiApp(
        config: ApplicationConfig = {},
        customDependencies: Partial<WebApplicationDependencies> = {}
    ): WebApplication {
        return ApplicationFactory.create({
            ...config,
            name: config.name || 'API Application'
        }, customDependencies)
    }

    /**
     * 创建 Web 应用程序
     * 
     * @example
     * ```typescript
     * const app = ApplicationFactory.createWebApp({
     *   name: 'My Web App',
     *   port: 3000
     * });
     * ```
     * 
     * @param config 应用程序配置
     * @param customDependencies 自定义依赖
     * @returns Web Application 实例
     */
    static createWebApp(
        config: ApplicationConfig = {},
        customDependencies: Partial<WebApplicationDependencies> = {}
    ): WebApplication {
        return ApplicationFactory.create(config, customDependencies)
    }

    /**
     * 创建命令行应用程序
     * 
     * @example
     * ```typescript
     * const app = ApplicationFactory.createCliApp({
     *   name: 'cosy',
     *   description: 'Cosy Framework CLI',
     *   version: '1.0.0'
     * });
     * 
     * app.command('serve').action(async () => {
     *   // 执行 serve 命令
     * });
     * 
     * await app.parse();
     * ```
     * 
     * @param config CLI 应用程序配置
     * @returns CLI Application 实例
     */
    static createCliApp(config: {
        name?: string
        description?: string
        version?: string
        debug?: boolean
    } = {}): CommanderApp {
        const logger = ApplicationFactory.createLogger('cli')

        return new CommanderApp(logger, {
            name: config.name || 'cosy',
            description: config.description || 'Cosy Framework CLI',
            version: config.version || '0.1.0'
        })
    }


} 
