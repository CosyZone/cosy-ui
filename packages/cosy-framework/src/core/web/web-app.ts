import { ApplicationConfig } from '../../types.js'
import { ILifecycleHooks } from '@coffic/cosy-interfaces'
import { cors, errorHandler, logger } from '@coffic/cosy-middleware'
import { Server } from '@coffic/cosy-http'
import { IRequest, ResponseInterface, IRouteHandler, IConfigManager, IContainer, IServiceProvider, IRouter, IMiddlewarePipeline, IServer, ILogger } from '@coffic/cosy-interfaces'
import { Application } from '../base/application.js'

/**
 * 应用程序配置接口
 */
export interface WebApplicationDependencies {
    config: IConfigManager;
    container: IContainer;
    router: IRouter;
    pipeline: IMiddlewarePipeline;
    logger: ILogger;
}

/**
 * 应用程序类
 * 
 * 核心功能：
 * 1. 配置管理
 * 2. 服务容器
 * 3. 中间件管理
 * 4. 路由管理
 * 5. 生命周期管理
 * 6. 日志管理
 */
export class WebApplication extends Application {
    public config: IConfigManager

    /**
     * 服务容器
     * 
     * 服务容器是应用程序的核心组件，负责管理应用程序的依赖注入和生命周期。
     * 它提供了绑定、解析和获取服务实例的功能。
     */
    public container: IContainer

    /**
     * 路由器
     * 
     * 路由器是应用程序的路由管理组件，负责处理请求的路由和分发。
     * 它提供了路由注册、匹配和处理的功能。
     */
    public router: IRouter

    /**
     * 管道
     * 
     * 管道是应用程序的中间件管理组件，负责处理请求的中间件和响应的中间件。
     * 它提供了中间件注册、匹配和处理的功能。
     */
    public pipeline: IMiddlewarePipeline

    /**
     * HTTP 服务器
     */
    private server?: IServer

    /**
     * 生命周期钩子
     * 
     * 生命周期钩子是应用程序的生命周期管理组件，负责处理应用程序的生命周期。
     * 它提供了生命周期钩子的注册和执行的功能。
     */
    private hooks: ILifecycleHooks = {}

    /**
     * 是否已启动
     */
    private booted: boolean = false

    /**
     * 服务提供者
     * 
     * 服务提供者是应用程序的服务管理组件，负责管理应用程序的服务。
     * 它提供了服务注册、解析和获取的功能。
     */
    private providers: IServiceProvider[] = []

    /**
     * 创建应用程序实例
     * @param appConfig 应用程序配置
     * @param dependencies 应用程序依赖
     */
    constructor(
        appConfig: ApplicationConfig = {},
        dependencies: WebApplicationDependencies
    ) {
        // 调用基类构造函数，传入日志记录器和应用配置
        super(
            dependencies.logger,
            appConfig.name || 'Web Application',
            appConfig.env || 'development',
            appConfig.debug || false
        )

        this.config = dependencies.config
        this.container = dependencies.container
        this.router = dependencies.router
        this.pipeline = dependencies.pipeline

        // 合并配置
        this.config.merge(appConfig)

        // 注册默认中间件
        this.registerDefaultMiddlewares()

        // 注册核心服务
        this.registerCoreServices()

        // 记录应用程序初始化日志
        this.logger.debug('✅ Web Application initialized', {
            name: this.getName(),
            env: this.getEnv(),
            debug: this.isDebug()
        })
    }

    /**
     * 注册默认中间件
     */
    private registerDefaultMiddlewares(): void {
        this.logger.debug('Registering default middlewares')

        // 注册日志中间件
        this.pipeline.pipe(logger)

        // 注册错误处理中间件
        this.pipeline.pipe(errorHandler)

        // 注册 CORS 中间件
        this.pipeline.pipe(cors)
    }

    /**
     * 注册核心服务
     */
    private registerCoreServices(): void {
        this.logger.debug('Registering core services')

        this.container.instance('app', this)
        this.container.instance('config', this.config)
        this.container.instance('router', this.router)
        this.container.instance('logger', this.logger)
    }

    /**
     * 设置生命周期钩子
     * @param hooks 生命周期钩子
     */
    setHooks(hooks: ILifecycleHooks): void {
        this.hooks = hooks
        this.logger.debug('Lifecycle hooks set', {
            hasBeforeBoot: !!hooks.beforeBoot,
            hasAfterBoot: !!hooks.afterBoot
        })
    }

    /**
     * 注册服务提供者
     * @param provider 服务提供者
     */
    register(provider: IServiceProvider): void {
        this.providers.push(provider)
        provider.register(this.container)
        this.logger.debug('Service provider registered', {
            provider: provider.constructor.name
        })
    }

    /**
     * 启动应用程序
     */
    async boot(): Promise<void> {
        this.logger.debug('Booting application...')

        if (this.booted) {
            this.logger.warn('Application already booted')
            return
        }

        try {
            // 执行启动前钩子
            if (this.hooks.beforeBoot) {
                this.logger.debug('Executing beforeBoot hooks')
                await this.hooks.beforeBoot()
            }

            // 启动服务提供者
            for (const provider of this.providers) {
                this.logger.debug('Booting provider', { provider: provider.constructor.name })
                if (provider.boot) {
                    await provider.boot(this.container)
                }
            }

            this.booted = true
            this.logger.info('Application booted successfully')

            // 执行启动后钩子
            if (this.hooks.afterBoot) {
                this.logger.debug('Executing afterBoot hooks')
                await this.hooks.afterBoot()
            }
        } catch (error) {
            this.logger.error('Failed to boot application', { error })
            throw error
        }
    }

    /**
     * 启动应用
     */
    async start(port: number = 3000): Promise<void> {
        try {
            // 启动服务提供者
            await this.boot()

            this.logger.info('Starting HTTP server', { port })

            // 创建 HTTP 服务器，并传入日志记录器
            const server = new Server({
                port,
                logger: this.createChildLogger('http')
            })

            // 添加全局中间件
            for (const middleware of this.pipeline.getMiddlewares()) {
                this.logger.debug('Adding middleware', { middleware: middleware.name })
                server.use(middleware)
            }

            // 设置路由处理器
            const routeHandler: IRouteHandler = async (request: IRequest, response: ResponseInterface) => {
                const route = this.router.resolve(request.method, request.path)
                if (route) {
                    this.logger.debug('Route matched', {
                        method: request.method,
                        path: request.path,
                        handler: route.handler.name
                    })
                    return route.handler(request, response)
                }
                this.logger.warn('Route not found', { method: request.method, path: request.path })
                response.status(404).json({ error: 'Not Found' })
            }
            server.setRouteHandler(routeHandler)

            // 启动服务器
            await server.listen(port)
            this.server = server
            this.logger.info('Server started successfully', {
                port,
                name: this.getName(),
                env: this.getEnv()
            })
        } catch (error) {
            this.logger.error('Failed to start server', { error })
            throw error
        }
    }

    /**
     * 停止应用
     */
    async stop(): Promise<void> {
        try {
            if (this.server) {
                this.logger.info('Stopping server...')
                await this.server.close()
                this.logger.info('Server stopped successfully')
            }
        } catch (error) {
            this.logger.error('Failed to stop server', { error })
            throw error
        }
    }
} 
