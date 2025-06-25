import { Configuration } from '@coffic/cosy-config'
import { ServiceContainer } from '@coffic/cosy-container'
import { Pipeline } from '@coffic/cosy-middleware'
import { Router } from '@coffic/cosy-router'
import { Logger } from '@coffic/cosy-logger'
import { IConfigManager, IContainer, IRouter, ILogger, LogLevel } from '@coffic/cosy-interfaces'
import { Application, ApplicationDependencies } from './application.js'
import { ApplicationConfig } from './types.js'

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
     */
    protected static createLogger(): ILogger {
        return new Logger({
            pretty: true, // 开发环境下默认美化输出
            timestamp: false,
            level: LogLevel.DEBUG, // 启用调试级别的日志
            context: {
                source: 'framework' // 标记这是框架日志
            },
            prefix: '💤' // 为框架日志添加前缀
        })
    }

    /**
     * 创建默认依赖
     */
    protected static createDefaultDependencies(): ApplicationDependencies {
        const logger = ApplicationFactory.createLogger()
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
        customDependencies: Partial<ApplicationDependencies> = {}
    ): Application {
        // 合并默认依赖和自定义依赖
        const dependencies = {
            ...ApplicationFactory.createDefaultDependencies(),
            ...customDependencies
        }

        return new Application(config, dependencies)
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
        customDependencies: Partial<ApplicationDependencies> = {}
    ): Application {
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
        customDependencies: Partial<ApplicationDependencies> = {}
    ): Application {
        return ApplicationFactory.create(config, customDependencies)
    }
} 
