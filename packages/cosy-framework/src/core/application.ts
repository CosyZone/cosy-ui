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
import { Pipeline, MiddlewareRegistry } from '../middleware'
import { Configuration, Environment, EnvironmentSource } from '../config'
import { HttpContext, Request, Response, HttpStatus } from '../http'

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
     */
    configure(callback: (app: ApplicationInterface) => void): ApplicationInterface {
        callback(this)
        return this
    }

    /**
     * 设置生命周期钩子
     */
    setHooks(hooks: ApplicationLifecycleHooks): this {
        this.hooks = { ...this.hooks, ...hooks }
        return this
    }

    /**
     * 获取/设置配置
     */
    config(key: string, value?: any): any {
        if (value !== undefined) {
            this.configuration.set(key, value)
            return this
        }
        return this.configuration.get(key)
    }

    // === 服务容器方法 ===

    register(provider: ServiceProvider): ApplicationInterface {
        provider.register(this.container)
        return this
    }

    resolve<T>(token: string | symbol): T {
        return this.container.resolve<T>(token)
    }

    singleton<T>(token: string | symbol, implementation: Constructor<T>): ApplicationInterface {
        this.container.singleton(token, implementation)
        return this
    }

    bind<T>(token: string | symbol, implementation: Constructor<T>): ApplicationInterface {
        this.container.bind(token, implementation)
        return this
    }

    // === 路由方法 ===

    get(path: string, handler: RouteHandler): RouteInterface {
        return this.router.get(path, handler)
    }

    post(path: string, handler: RouteHandler): RouteInterface {
        return this.router.post(path, handler)
    }

    put(path: string, handler: RouteHandler): RouteInterface {
        return this.router.put(path, handler)
    }

    patch(path: string, handler: RouteHandler): RouteInterface {
        return this.router.patch(path, handler)
    }

    delete(path: string, handler: RouteHandler): RouteInterface {
        return this.router.delete(path, handler)
    }

    group(prefix: string | RouteGroupOptions, callback: (router: RouterInterface) => void): void {
        this.router.group(prefix, callback)
    }

    // === 中间件方法 ===

    use(middleware: MiddlewareHandler): ApplicationInterface {
        this.globalMiddlewares.push(middleware)
        return this
    }

    useGlobal(middleware: MiddlewareHandler): ApplicationInterface {
        this.middlewareRegistry.global(middleware)
        return this
    }

    /**
     * 注册命名中间件
     */
    middleware(name: string, middleware: MiddlewareHandler): ApplicationInterface {
        this.middlewareRegistry.register(name, middleware)
        return this
    }

    // === 请求处理 ===

    /**
     * 处理 HTTP 请求
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
            const finalHandler = async (ctx: HttpContextInterface) => {
                return match.route.handler(ctx)
            }

            const handler = await pipeline.then(finalHandler)
            const result = await handler(context)

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

    isRunning(): boolean {
        return this.running
    }

    getPort(): number | undefined {
        return this.port
    }

    getContainer(): ServiceContainer {
        return this.container
    }

    getRouter(): Router {
        return this.router
    }

    getConfig(): Configuration {
        return this.configuration
    }

    // === 私有方法 ===

    private registerCoreServices(): void {
        this.container.instance('app', this)
        this.container.instance('container', this.container)
        this.container.instance('router', this.router)
        this.container.instance('config', this.configuration)
        this.container.instance('middleware', this.middlewareRegistry)
    }

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

    private async loadConfiguration(): Promise<void> {
        // 加载环境变量
        const envSource = new EnvironmentSource()
        await this.configuration.load(envSource)
    }

    private async registerProviders(): Promise<void> {
        const providers = this.configuration.get<Constructor<ServiceProvider>[]>('app.providers', [])

        for (const ProviderClass of providers) {
            const provider = new ProviderClass()
            this.register(provider)
        }
    }

    private async bootProviders(): Promise<void> {
        // 这里可以调用所有服务提供者的 boot 方法
        // 暂时留空，等后续实现
    }

    /**
     * 创建应用程序实例
     */
    static create(config?: ApplicationConfig): Application {
        return new Application(config)
    }

    /**
     * 快速启动应用程序
     */
    static async run(config?: ApplicationConfig, port?: number): Promise<Application> {
        const app = new Application(config)
        await app.boot()
        await app.start(port)
        return app
    }
} 
