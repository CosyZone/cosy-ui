/**
 * 应用程序核心模块
 * 
 * 本模块实现了框架的核心应用程序类，提供：
 * 1. 应用程序生命周期管理（启动、运行、停止）
 * 2. HTTP 服务器集成（基于 Fastify）
 * 3. 服务容器集成（依赖注入）
 * 4. 路由系统（RESTful API）
 * 5. 中间件系统（请求处理管道）
 * 6. 配置管理（环境配置）
 */

import { fastify, FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import {
    ApplicationInterface,
    ApplicationConfig,
    ApplicationLifecycleHooks,
    ServiceProvider,
    Constructor,
    RouteHandler,
    RouteInterface,
    RouterInterface,
    RouteGroupOptions,
    MiddlewareHandler,
    RequestInterface,
    ResponseInterface,
    HttpContextInterface
} from '../types'

import { ServiceContainer } from '../container'
import { Router } from '../routing'
import { Configuration, Environment, EnvironmentSource } from '../config'
import { HttpContext, Request, Response, HttpStatus } from '../http'
import { MiddlewareRegistry, Pipeline, IMiddlewareHandler } from '@coffic/cosy-middleware'

/**
 * 应用程序核心类
 * 
 * 工作流程：
 * 1. 初始化：创建核心组件（容器、路由器、配置等）
 * 2. 启动：加载配置、注册服务、启动服务器
 * 3. 运行：处理请求、执行中间件、调用路由
 * 4. 停止：关闭服务器、清理资源
 */
export class Application implements ApplicationInterface {
    private container: ServiceContainer
    private router: Router
    private configuration: Configuration
    private middlewareRegistry: MiddlewareRegistry
    private globalMiddlewares: MiddlewareHandler[] = []
    private running = false
    private port?: number
    private server?: FastifyInstance
    private hooks: ApplicationLifecycleHooks = {}

    /**
     * 创建应用程序实例
     * 
     * @param config 应用程序配置
     */
    constructor(config?: ApplicationConfig) {
        this.container = new ServiceContainer()
        this.router = new Router()
        this.configuration = new Configuration()
        this.middlewareRegistry = new MiddlewareRegistry()

        // 注册核心服务
        this.registerCoreServices()

        // 应用默认配置
        if (config) {
            this.applyConfig(config)
        }
    }

    /**
     * 启动应用程序
     * 
     * 执行顺序：
     * 1. 调用 beforeBoot 钩子
     * 2. 加载配置（环境变量等）
     * 3. 注册服务提供者
     * 4. 启动服务提供者
     * 5. 调用 afterBoot 钩子
     */
    async boot(): Promise<void> {
        if (this.hooks.beforeBoot) {
            await this.hooks.beforeBoot()
        }

        // 加载配置
        await this.loadConfiguration()

        // 注册服务提供者
        await this.registerProviders()

        // 启动服务提供者
        await this.bootProviders()

        if (this.hooks.afterBoot) {
            await this.hooks.afterBoot()
        }
    }

    /**
     * 启动 HTTP 服务器
     * 
     * 执行顺序：
     * 1. 调用 beforeStart 钩子
     * 2. 创建 Fastify 服务器
     * 3. 配置 CORS
     * 4. 注册路由处理器
     * 5. 启动服务器监听
     * 6. 调用 afterStart 钩子
     * 
     * @param port 服务器端口号
     */
    async start(port?: number): Promise<void> {
        console.log('[Cosy] 🔄 Application:start, port:', port)

        if (this.running) {
            throw new Error('Application is already running')
        }

        if (this.hooks.beforeStart) {
            await this.hooks.beforeStart()
        }

        this.port = port || this.configuration.get('app.port', 3000)

        // 创建 Fastify 实例
        this.server = fastify({
            logger: this.configuration.get('app.debug', false)
        })

        // 注册 CORS 插件
        await this.server.register(cors, {
            origin: this.configuration.get('cors.origin', '*'),
            credentials: this.configuration.get('cors.credentials', true)
        })

        // 注册路由处理器
        this.server.route({
            method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
            url: '/*',
            handler: async (request, reply) => {
                try {
                    // 创建请求上下文
                    const context = HttpContext.create({
                        method: request.method,
                        url: request.url,
                        headers: request.headers as Record<string, string>,
                        body: request.body,
                        query: request.query as Record<string, string>,
                        params: request.params as Record<string, string>
                    })

                    // 处理请求
                    const response = await this.handle(context.request)

                    // 设置响应
                    reply.status(response.getStatus())
                    const headers = response.getHeaders()
                    for (const name in headers) {
                        reply.header(name, headers[name])
                    }
                    return response.getContent()
                } catch (error) {
                    // 错误处理
                    const status = error instanceof Error ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.BAD_REQUEST
                    reply.status(status).send({
                        error: error instanceof Error ? error.message : String(error),
                        stack: this.configuration.get('app.debug') ? error instanceof Error ? error.stack : undefined : undefined
                    })
                }
            }
        })

        // 启动服务器
        await this.server.listen({ port: this.port, host: '0.0.0.0' })
        this.running = true

        console.log(`[Cosy] 🚀 Application started on port ${this.port}`)
        console.log(`[Cosy] 🌍 Environment: ${Environment.getCurrent()}`)
        console.log(`[Cosy] 🎯 Debug mode: ${Environment.isDebug() ? 'enabled' : 'disabled'}`)

        if (this.hooks.afterStart) {
            await this.hooks.afterStart()
        }
    }

    /**
     * 停止应用程序
     * 
     * 执行顺序：
     * 1. 调用 beforeStop 钩子
     * 2. 关闭 HTTP 服务器
     * 3. 设置状态为未运行
     * 4. 调用 afterStop 钩子
     */
    async stop(): Promise<void> {
        if (!this.running) {
            return
        }

        if (this.hooks.beforeStop) {
            await this.hooks.beforeStop()
        }

        if (this.server) {
            await this.server.close()
        }

        this.running = false
        console.log('[Cosy] Application stopped')

        if (this.hooks.afterStop) {
            await this.hooks.afterStop()
        }
    }

    /**
     * 配置应用程序
     * 
     * 使用示例：
     * ```typescript
     * app.configure(app => {
     *   app.config('app.name', 'My App')
     *   app.config('database.host', 'localhost')
     * })
     * ```
     * 
     * @param callback 配置回调函数
     */
    configure(callback: (app: ApplicationInterface) => void): ApplicationInterface {
        callback(this)
        return this
    }

    /**
     * 设置生命周期钩子
     * 
     * @param hooks 生命周期钩子对象
     */
    setHooks(hooks: ApplicationLifecycleHooks): this {
        this.hooks = { ...this.hooks, ...hooks }
        return this
    }

    /**
     * 获取或设置配置值
     * 
     * @param key 配置键
     * @param value 配置值（可选）
     * @returns 配置值或应用程序实例
     */
    config(key: string, value?: any): any {
        if (value !== undefined) {
            this.configuration.set(key, value)
            return this
        }
        return this.configuration.get(key)
    }

    // === 服务容器方法 ===

    /**
     * 注册服务提供者
     * 
     * @param provider 服务提供者实例
     */
    register(provider: ServiceProvider): ApplicationInterface {
        provider.register(this.container)
        return this
    }

    /**
     * 从容器解析服务
     * 
     * @param token 服务标识符
     */
    resolve<T>(token: string | symbol): T {
        return this.container.resolve<T>(token)
    }

    /**
     * 注册单例服务
     * 
     * @param token 服务标识符
     * @param implementation 服务实现类
     */
    singleton<T>(token: string | symbol, implementation: Constructor<T>): ApplicationInterface {
        this.container.singleton(token, implementation)
        return this
    }

    /**
     * 注册瞬态服务
     * 
     * @param token 服务标识符
     * @param implementation 服务实现类
     */
    bind<T>(token: string | symbol, implementation: Constructor<T>): ApplicationInterface {
        this.container.bind(token, implementation)
        return this
    }

    // === 路由方法 ===

    /**
     * 注册 GET 路由
     * 
     * @param path 路由路径
     * @param handler 路由处理器
     */
    get(path: string, handler: RouteHandler): RouteInterface {
        return this.router.get(path, handler)
    }

    /**
     * 注册 POST 路由
     * 
     * @param path 路由路径
     * @param handler 路由处理器
     */
    post(path: string, handler: RouteHandler): RouteInterface {
        return this.router.post(path, handler)
    }

    /**
     * 注册 PUT 路由
     * 
     * @param path 路由路径
     * @param handler 路由处理器
     */
    put(path: string, handler: RouteHandler): RouteInterface {
        return this.router.put(path, handler)
    }

    /**
     * 注册 PATCH 路由
     * 
     * @param path 路由路径
     * @param handler 路由处理器
     */
    patch(path: string, handler: RouteHandler): RouteInterface {
        return this.router.patch(path, handler)
    }

    /**
     * 注册 DELETE 路由
     * 
     * @param path 路由路径
     * @param handler 路由处理器
     */
    delete(path: string, handler: RouteHandler): RouteInterface {
        return this.router.delete(path, handler)
    }

    /**
     * 创建路由组
     * 
     * 使用示例：
     * ```typescript
     * app.group('/api', router => {
     *   router.get('/users', handler)
     *   router.post('/users', handler)
     * })
     * ```
     * 
     * @param prefix 路由组前缀或选项
     * @param callback 路由组配置回调
     */
    group(prefix: string | RouteGroupOptions, callback: (router: RouterInterface) => void): void {
        this.router.group(prefix, callback)
    }

    // === 中间件方法 ===

    /**
     * 注册全局中间件
     * 
     * @param middleware 中间件处理器
     */
    use(middleware: MiddlewareHandler): ApplicationInterface {
        this.globalMiddlewares.push(middleware)
        return this
    }

    /**
     * 注册全局中间件（另一种方式）
     * 
     * @param middleware 中间件处理器
     */
    useGlobal(middleware: MiddlewareHandler): ApplicationInterface {
        this.middlewareRegistry.global(middleware)
        return this
    }

    /**
     * 注册命名中间件
     * 
     * @param name 中间件名称
     * @param middleware 中间件处理器
     */
    middleware(name: string, middleware: MiddlewareHandler): ApplicationInterface {
        this.middlewareRegistry.register(name, middleware)
        return this
    }

    // === 请求处理 ===

    /**
     * 处理 HTTP 请求
     * 
     * 处理流程：
     * 1. 创建响应对象
     * 2. 匹配路由
     * 3. 构建中间件管道
     * 4. 执行中间件和路由处理器
     * 5. 处理响应结果
     * 
     * @param request 请求对象
     * @returns 响应对象
     */
    async handle(request: RequestInterface): Promise<ResponseInterface> {
        const response = new Response()
        const context = new HttpContext(request, response)

        try {
            // 匹配路由
            const match = this.router.resolve(request.method, request.path)

            if (!match) {
                return response.status(HttpStatus.NOT_FOUND).json({
                    error: 'Route not found',
                    path: request.path,
                    method: request.method
                })
            }

            // 设置路由参数
            request.params = match.params

            // 构建中间件管道
            const middlewares = [
                ...this.middlewareRegistry.getGlobal(),
                ...this.globalMiddlewares,
                ...(match.route.middleware || [])
            ]

            const pipeline = new Pipeline(middlewares)

            // 执行中间件和路由处理器
            const finalHandler: RouteHandler = (request, response) => {
                return match.route.handler(request, response)
            }

            const handler = await pipeline.then(finalHandler)
            const result = await handler(context.request, context.response)

            // 如果处理器返回了结果但响应没有设置，自动设置 JSON 响应
            if (result !== undefined && !response.hasResponded()) {
                if (typeof result === 'string') {
                    response.html(result)
                } else {
                    response.json(result)
                }
            }

            return response

        } catch (error) {
            const err = error as Error
            console.error('Request handling error:', err)

            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err.message,
                ...(Environment.isDebug() && { stack: err.stack })
            })
        }
    }

    /**
     * 处理原生 HTTP 请求（Node.js 集成）
     * 
     * 处理流程：
     * 1. 创建框架请求对象
     * 2. 调用请求处理器
     * 3. 设置响应头和状态码
     * 4. 发送响应内容
     * 
     * @param req 原生请求对象
     * @param res 原生响应对象
     */
    async handleHttp(req: any, res: any): Promise<void> {
        const request = new Request({
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: req.body,
            ip: req.ip || req.connection?.remoteAddress
        })

        const response = await this.handle(request)

        // 设置响应头
        const headers = response.getHeaders()
        for (const [name, value] of Object.entries(headers)) {
            res.setHeader(name, value)
        }

        // 设置 Cookies
        const cookies = response.getSetCookieHeaders()
        if (cookies.length > 0) {
            res.setHeader('Set-Cookie', cookies)
        }

        // 设置状态码和发送响应
        res.statusCode = response.getStatus()
        res.end(response.getContent())
    }

    // === 状态方法 ===

    /**
     * 获取应用程序运行状态
     */
    isRunning(): boolean {
        return this.running
    }

    /**
     * 获取服务器端口
     */
    getPort(): number | undefined {
        return this.port
    }

    /**
     * 获取服务容器实例
     */
    getContainer(): ServiceContainer {
        return this.container
    }

    /**
     * 获取路由器实例
     */
    getRouter(): Router {
        return this.router
    }

    /**
     * 获取配置实例
     */
    getConfig(): Configuration {
        return this.configuration
    }

    // === 私有方法 ===

    /**
     * 注册核心服务到容器
     * 
     * 注册的服务：
     * - app: 应用程序实例
     * - container: 服务容器
     * - router: 路由器
     * - config: 配置管理器
     * - middleware: 中间件注册器
     */
    private registerCoreServices(): void {
        this.container.instance('app', this)
        this.container.instance('container', this.container)
        this.container.instance('router', this.router)
        this.container.instance('config', this.configuration)
        this.container.instance('middleware', this.middlewareRegistry)
    }

    /**
     * 应用配置
     * 
     * 配置项：
     * - app.name: 应用程序名称
     * - app.debug: 调试模式
     * - app.port: 服务器端口
     * - app.host: 服务器主机
     * - app.timezone: 时区
     * - app.locale: 语言
     * 
     * @param config 配置对象
     */
    private applyConfig(config: ApplicationConfig): void {
        this.configuration.merge({
            app: {
                name: config.name || 'Cosy Application',
                debug: config.debug ?? Environment.isDebug(),
                port: config.port || 3000,
                host: config.host || '0.0.0.0',
                timezone: config.timezone || 'UTC',
                locale: config.locale || 'en'
            }
        })

        // 应用全局中间件
        if (config.middleware) {
            config.middleware.forEach(middleware => this.use(middleware))
        }
    }

    /**
     * 加载配置
     * 
     * 加载顺序：
     * 1. 环境变量
     * 2. 配置文件
     * 3. 运行时配置
     */
    private async loadConfiguration(): Promise<void> {
        // 加载环境变量
        const envSource = new EnvironmentSource()
        await this.configuration.load(envSource)
    }

    /**
     * 注册配置的服务提供者
     */
    private async registerProviders(): Promise<void> {
        const providers = this.configuration.get<Constructor<ServiceProvider>[]>('app.providers', [])

        for (const ProviderClass of providers) {
            const provider = new ProviderClass()
            this.register(provider)
        }
    }

    /**
     * 启动服务提供者
     */
    private async bootProviders(): Promise<void> {
        // 这里可以调用所有服务提供者的 boot 方法
        // 暂时留空，等后续实现
    }

    /**
     * 创建应用程序实例
     * 
     * 使用示例：
     * ```typescript
     * const app = Application.create({
     *   name: 'My App',
     *   port: 3000
     * })
     * ```
     * 
     * @param config 应用程序配置
     */
    static create(config?: ApplicationConfig): Application {
        return new Application(config)
    }

    /**
     * 快速启动应用程序
     * 
     * 使用示例：
     * ```typescript
     * const app = await Application.run({
     *   name: 'My App',
     *   port: 3000
     * })
     * ```
     * 
     * @param config 应用程序配置
     * @param port 服务器端口
     */
    static async run(config?: ApplicationConfig, port?: number): Promise<Application> {
        const app = new Application(config)
        await app.boot()
        await app.start(port)
        return app
    }
} 
