import { ApplicationConfig } from './types'
import { ILifecycleHooks } from '@coffic/cosy-interfaces'
import { Configuration } from '@coffic/cosy-config'
import { ServiceContainer } from '@coffic/cosy-container'
import { cors, errorHandler, logger, Pipeline } from '@coffic/cosy-middleware'
import { Router } from '@coffic/cosy-router'
import { Server } from '@coffic/cosy-http'
import { IRequest, ResponseInterface, IRouteHandler, IConfigManager, IContainer, IServiceProvider, IRouter, IMiddlewarePipeline, IServer } from '@coffic/cosy-interfaces'

/**
 * 应用程序配置接口
 */
export interface ApplicationDependencies {
    config?: IConfigManager;
    container?: IContainer;
    router?: IRouter;
    pipeline?: IMiddlewarePipeline;
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
 */
export class Application {
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
        dependencies: ApplicationDependencies = {}
    ) {
        // 初始化依赖，如果没有提供则使用默认实现
        this.config = dependencies.config || new Configuration()
        this.container = dependencies.container || new ServiceContainer()
        this.router = dependencies.router || new Router()
        this.pipeline = dependencies.pipeline || new Pipeline()

        // 合并配置
        this.config.merge(appConfig)

        // 注册默认中间件
        this.registerDefaultMiddlewares()

        // 注册核心服务
        this.registerCoreServices()
    }

    /**
     * 注册默认中间件
     */
    private registerDefaultMiddlewares(): void {
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
        this.container.instance('app', this)
        this.container.instance('config', this.config)
        this.container.instance('router', this.router)
    }

    /**
     * 设置生命周期钩子
     * @param hooks 生命周期钩子
     */
    setHooks(hooks: ILifecycleHooks): void {
        this.hooks = hooks
    }

    /**
     * 注册服务提供者
     * @param provider 服务提供者
     */
    register(provider: IServiceProvider): void {
        this.providers.push(provider)
        provider.register(this.container)
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
                await provider.boot(this.container)
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
} 
