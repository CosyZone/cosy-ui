import { createServer, Server as HttpServer } from 'http'
import { Context } from './context'
import { IMiddlewareHandler, IMiddlewarePipeline, IRouteHandler, IServer } from '@coffic/cosy-interfaces'
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
    private config: {
        port: number;
        hostname?: string;
        ssl?: {
            key: string;
            cert: string;
        };
        timeout?: number;
        keepAliveTimeout?: number;
    }

    constructor() {
        this.pipeline = new Pipeline()
        this.config = {
            port: 3000
        }
        console.log('[Cosy HTTP] Server instance created')
    }

    /**
     * 设置路由处理器
     */
    setRouteHandler(handler: IRouteHandler): void {
        this.routeHandler = handler
        console.log('[Cosy HTTP] Route handler set')
    }

    /**
     * 添加中间件
     */
    use(middleware: IMiddlewareHandler): void {
        this.pipeline.pipe(middleware)
        console.log('[Cosy HTTP] Middleware added to pipeline')
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

        console.log('[Cosy HTTP] Starting server...')

        // 创建 HTTP 服务器
        this.server = createServer(async (req, res) => {
            const ctx = new Context(req, res)
            console.log(`[Cosy HTTP] Incoming ${req.method} request to ${req.url}`)

            try {
                // 设置最终处理器
                const finalHandler: IRouteHandler = async (request, response) => {
                    if (!res.headersSent && this.routeHandler) {
                        console.log('[Cosy HTTP] Executing route handler')
                        const result = await this.routeHandler(request, response)
                        if (result !== undefined && !res.headersSent) {
                            return result
                        }
                    }
                }

                // 运行中间件管道
                console.log('[Cosy HTTP] Executing middleware pipeline')
                const result = await this.pipeline.pipe(finalHandler).execute(ctx.request, ctx.response)

                // 如果有返回值且响应未发送，则发送响应
                if (result !== undefined && !res.headersSent) {
                    ctx.response.send(result)
                }
                // 确保响应被发送
                else if (!res.headersSent) {
                    console.log('[Cosy HTTP] Ending response')
                    ctx.response.end()
                }
            } catch (error) {
                console.error('[Cosy HTTP] Request handling error:', error)
                if (!res.headersSent) {
                    ctx.response.status(500).json({ error: 'Internal Server Error' })
                }
            } finally {
                console.log(`[Cosy HTTP] Request completed: ${req.method} ${req.url}`)
            }
        })

        // 设置超时
        if (this.config.timeout) {
            this.server.timeout = this.config.timeout
        }

        // 设置 keep-alive 超时
        if (this.config.keepAliveTimeout) {
            this.server.keepAliveTimeout = this.config.keepAliveTimeout
        }

        // 启动服务器
        await new Promise<void>((resolve) => {
            this.server?.listen(port, hostname, () => {
                console.log(`[Cosy HTTP] Server is running at http://${hostname || 'localhost'}:${port}`)
                console.log('[Cosy HTTP] Ready to handle requests')
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

        console.log('[Cosy HTTP] Stopping server...')
        await new Promise<void>((resolve, reject) => {
            this.server?.close((err) => {
                if (err) {
                    console.error('[Cosy HTTP] Error while stopping server:', err)
                    reject(err)
                } else {
                    this.server = undefined
                    console.log('[Cosy HTTP] Server stopped')
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
    getConfig() {
        return { ...this.config }
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
