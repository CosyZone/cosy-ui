import {
    ApplicationConfig,
    LifecycleHooks,
    ServiceProvider
} from './types'

import { Configuration } from '@coffic/cosy-config'
import { ServiceContainer } from '@coffic/cosy-container'
import { cors, errorHandler, logger, Pipeline } from '@coffic/cosy-middleware'
import { Router } from '@coffic/cosy-router'
import { Server } from '@coffic/cosy-http'
import { IRequest, ResponseInterface, IRouteHandler } from '@coffic/cosy-interfaces'

/**
 * 应用程序类
 * 
 * 核心功能：
 * 1. 配置管理
 * 2. 服务容器
 * 3. 中间件管理
 * 4. 路由管理
 * 5. 生命周期管理
 */
export class Application {
    public config: Configuration
    /**
     * 服务容器
     * 
     * 服务容器是应用程序的核心组件，负责管理应用程序的依赖注入和生命周期。
     * 它提供了绑定、解析和获取服务实例的功能。
     */
    public container: ServiceContainer

    /**
     * 路由器
     * 
     * 路由器是应用程序的路由管理组件，负责处理请求的路由和分发。
     * 它提供了路由注册、匹配和处理的功能。
     */
    public router: Router

    /**
     * 管道
     * 
     * 管道是应用程序的中间件管理组件，负责处理请求的中间件和响应的中间件。
     * 它提供了中间件注册、匹配和处理的功能。
     */
    public pipeline: Pipeline

    /**
     * HTTP 服务器
     */
    private server?: Server

    /**
     * 生命周期钩子
     * 
     * 生命周期钩子是应用程序的生命周期管理组件，负责处理应用程序的生命周期。
     * 它提供了生命周期钩子的注册和执行的功能。
     */
    private hooks: LifecycleHooks = {}

    /**
     * 是否已启动
     */
    private booted: boolean = false

    /**
     * 是否已启动
     */
    private started: boolean = false

    /**
     * 服务提供者
     * 
     * 服务提供者是应用程序的服务管理组件，负责管理应用程序的服务。
     * 它提供了服务注册、解析和获取的功能。
     */
    private providers: ServiceProvider[] = []

    /**
     * 创建应用程序实例
     * @param config 应用程序配置
     */
    constructor(config: ApplicationConfig = {}) {
        this.config = new Configuration()
        this.config.merge(config)
        this.container = new ServiceContainer()
        this.router = new Router()
        this.pipeline = new Pipeline()

        // 注册日志中间件
        this.pipeline.pipe(logger)

        // 注册错误处理中间件
        this.pipeline.pipe(errorHandler)

        // 注册 CORS 中间件
        this.pipeline.pipe(cors)

        // 注册核心服务
        this.registerCoreServices()
    }

    /**
     * 注册核心服务
     */
    private registerCoreServices(): void {
        this.container.instance('app', this)
        this.container.instance('config', this.config)
        this.container.instance('router', this.router)
    }

    /**
     * 设置生命周期钩子
     * @param hooks 生命周期钩子
     */
    setHooks(hooks: LifecycleHooks): void {
        this.hooks = hooks
    }

    /**
     * 注册服务提供者
     * @param provider 服务提供者
     */
    register(provider: ServiceProvider): void {
        this.providers.push(provider)
        provider.register(this)
    }

    /**
     * 启动应用程序
     */
    async boot(): Promise<void> {
        console.log('[Cosy Framework] Booting application...')
        if (this.booted) {
            return
        }

        // 执行启动前钩子
        if (this.hooks.beforeBoot) {
            await this.hooks.beforeBoot()
        }

        // 启动服务提供者
        for (const provider of this.providers) {
            if (provider.boot) {
                await provider.boot(this)
            }
        }

        this.booted = true

        // 执行启动后钩子
        if (this.hooks.afterBoot) {
            await this.hooks.afterBoot()
        }
    }

    /**
     * 启动应用
     */
    async start(port: number = 3000): Promise<void> {
        // 启动服务提供者
        await this.boot()

        // 创建 HTTP 服务器
        this.server = new Server()

        // 添加全局中间件
        for (const middleware of this.pipeline.getMiddlewares()) {
            this.server.use(middleware)
        }

        // 设置路由处理器
        const routeHandler: IRouteHandler = async (request: IRequest, response: ResponseInterface) => {
            const route = this.router.resolve(request.method, request.path)
            if (route) {
                return route.handler(request, response)
            }
            response.status(404).json({ error: 'Not Found' })
        }
        this.server.setRouteHandler(routeHandler)

        // 启动服务器
        await this.server.listen(port)
    }

    /**
     * 停止应用
     */
    async stop(): Promise<void> {
        if (this.server) {
            await this.server.close()
        }
    }

    /**
     * 创建 API 应用程序
     * 
     * 原理：
     * 1. 创建一个预配置的 API 应用程序实例
     * 2. 自动添加适合 API 的中间件
     * 3. 配置 API 特定的设置
     * 
     * 工作流程：
     * 1. 使用提供的配置创建应用程序
     * 2. 添加 API 相关中间件（CORS、认证等）
     * 3. 配置 API 特定的错误处理和响应格式
     * 
     * 使用示例：
     * ```typescript
     * const api = createApiApp({
     *   name: 'My API',
     *   port: 8080
     * })
     * ```
     * 
     * @param config 应用程序配置
     * @returns 配置好的 API 应用程序实例
     */
    static createApiApp(config?: ApplicationConfig): Application {
        const app = new Application({
            ...config,
            name: config?.name || 'API Application'
        })

        // API 特定的中间件和配置
        // app.use(cors({ origin: '*' }))
        // app.use(apiMiddleware())

        return app
    }

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
    static createWebApp(config?: ApplicationConfig): Application {
        const app = new Application(config)

        // 添加常用中间件
        // app.use(cors())
        // app.use(logger())
        // app.use(bodyParser())

        return app
    }
} 
