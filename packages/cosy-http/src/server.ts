import { createServer, Server as HttpServer } from 'http'
import { Context } from './context'
import { IMiddlewareHandler, IMiddlewarePipeline, IRouteHandler, IServer, ILogger, ServerConfig } from '@coffic/cosy-interfaces'
import { Pipeline } from './pipeline'

/**
 * HTTP 服务器类
 * 
 * 负责管理 HTTP 服务器的生命周期，包括：
 * - 创建服务器实例
 * - 处理请求
 * - 启动和停止服务器
 */
export class Server implements IServer {
    private server?: HttpServer
    private pipeline: IMiddlewarePipeline
    private routeHandler?: IRouteHandler
    private config: Required<Pick<ServerConfig, 'port'>> & Omit<ServerConfig, 'port'>
    private logger: ILogger

    constructor(config: ServerConfig = {}) {
        // 如果没有提供日志记录器，使用一个简单的控制台适配器
        this.logger = config.logger || {
            info: (msg: string) => console.log(`[Cosy HTTP] ${msg}`),
            error: (msg: string, context?: any) => console.error(`[Cosy HTTP] ${msg}`, context),
            warn: (msg: string) => console.warn(`[Cosy HTTP] ${msg}`),
            debug: (msg: string, context?: any) => console.debug(`[Cosy HTTP] ${msg}`, context),
            log: (level: any, msg: string) => console.log(`[Cosy HTTP] ${msg}`),
            child: (name: string) => this.logger
        }

        this.pipeline = new Pipeline([], { logger: this.logger.child('pipeline') })
        this.config = {
            port: config.port || 3000,
            hostname: config.hostname,
            ssl: config.ssl,
            timeout: config.timeout,
            keepAliveTimeout: config.keepAliveTimeout
        }

        this.logger.info('Server instance created')
    }

    /**
     * 设置路由处理器
     */
    setRouteHandler(handler: IRouteHandler): void {
        this.routeHandler = handler
        this.logger.debug('Route handler set')
    }

    /**
     * 添加中间件
     */
    use(middleware: IMiddlewareHandler): void {
        this.pipeline.pipe(middleware)
        this.logger.debug('Middleware added to pipeline', { name: middleware.name })
    }

    /**
     * 启动服务器
     */
    async listen(port: number = 3000, hostname?: string): Promise<void> {
        if (this.server) {
            throw new Error('Server is already running')
        }

        this.config.port = port
        this.config.hostname = hostname

        this.logger.info('Starting server...')

        // 创建 HTTP 服务器
        this.server = createServer(async (req, res) => {
            const ctx = new Context(req, res)
            const requestLogger = this.logger.child('request')

            requestLogger.info(`Incoming ${req.method} request`, {
                method: req.method,
                url: req.url,
                headers: req.headers
            })

            try {
                // 设置最终处理器
                const finalHandler: IRouteHandler = async (request, response) => {
                    if (!res.headersSent && this.routeHandler) {
                        requestLogger.debug('Executing route handler')
                        const result = await this.routeHandler(request, response)
                        if (result !== undefined && !res.headersSent) {
                            return result
                        }
                    }
                }

                // 运行中间件管道
                requestLogger.debug('Executing middleware pipeline')
                const result = await this.pipeline.pipe(finalHandler).execute(ctx.request, ctx.response)

                // 如果有返回值且响应未发送，则发送响应
                if (result !== undefined && !res.headersSent) {
                    ctx.response.send(result)
                }
                // 确保响应被发送
                else if (!res.headersSent) {
                    requestLogger.debug('Ending response')
                    ctx.response.end()
                }

                requestLogger.info('Request completed successfully', {
                    method: req.method,
                    url: req.url,
                    statusCode: res.statusCode
                })
            } catch (error) {
                requestLogger.error('Request handling error', { error })
                if (!res.headersSent) {
                    ctx.response.status(500).json({ error: 'Internal Server Error' })
                }
            }
        })

        // 设置超时
        if (this.config.timeout) {
            this.server.timeout = this.config.timeout
            this.logger.debug('Server timeout set', { timeout: this.config.timeout })
        }

        // 设置 keep-alive 超时
        if (this.config.keepAliveTimeout) {
            this.server.keepAliveTimeout = this.config.keepAliveTimeout
            this.logger.debug('Keep-alive timeout set', { timeout: this.config.keepAliveTimeout })
        }

        // 启动服务器
        await new Promise<void>((resolve) => {
            this.server?.listen(port, hostname, () => {
                this.logger.info('Server started', {
                    url: `http://${hostname || 'localhost'}:${port}`,
                    port,
                    hostname: hostname || 'localhost'
                })
                resolve()
            })
        })
    }

    /**
     * 停止服务器
     */
    async close(): Promise<void> {
        if (!this.server) {
            throw new Error('Server is not running')
        }

        this.logger.info('Stopping server...')
        await new Promise<void>((resolve, reject) => {
            this.server?.close((err) => {
                if (err) {
                    this.logger.error('Error while stopping server', { error: err })
                    reject(err)
                } else {
                    this.server = undefined
                    this.logger.info('Server stopped successfully')
                    resolve()
                }
            })
        })
    }

    /**
     * 获取服务器实例
     */
    getInstance(): HttpServer | undefined {
        return this.server
    }

    /**
     * 获取服务器配置
     */
    getConfig(): Required<Pick<ServerConfig, 'port'>> & Omit<ServerConfig, 'port'> {
        return {
            ...this.config,
            logger: this.logger // 确保 logger 总是存在
        }
    }

    /**
     * 获取中间件列表
     */
    getMiddlewares(): IMiddlewareHandler[] {
        return this.pipeline.getMiddlewares()
    }

    /**
     * 获取当前连接数
     */
    getConnectionCount(): number {
        return this.server?.connections || 0
    }

    /**
     * 检查服务器是否正在运行
     */
    isRunning(): boolean {
        return !!this.server
    }

    /**
     * 重启服务器
     */
    async restart(): Promise<void> {
        const config = this.getConfig()
        await this.close()
        await this.listen(config.port, config.hostname)
    }
} 
