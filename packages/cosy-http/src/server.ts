import { createServer, Server as HttpServer } from 'http'
import { Context } from './context'
import { IMiddlewareHandler, IMiddlewarePipeline, IRouteHandler } from '@coffic/cosy-interfaces'
import { Pipeline } from './pipeline'

/**
 * HTTP 服务器类
 * 
 * 负责管理 HTTP 服务器的生命周期，包括：
 * - 创建服务器实例
 * - 处理请求
 * - 启动和停止服务器
 */
export class Server {
    private server?: HttpServer
    private pipeline: IMiddlewarePipeline
    private routeHandler?: IRouteHandler

    constructor() {
        this.pipeline = new Pipeline()
        console.log('[Cosy HTTP] Server instance created')
    }

    /**
     * 设置路由处理器
     */
    setRouteHandler(handler: IRouteHandler): this {
        this.routeHandler = handler
        console.log('[Cosy HTTP] Route handler set')
        return this
    }

    /**
     * 添加中间件
     */
    use(middleware: IMiddlewareHandler): this {
        this.pipeline.pipe(middleware)
        console.log('[Cosy HTTP] Middleware added to pipeline')
        return this
    }

    /**
     * 启动服务器
     */
    async listen(port: number = 3000): Promise<void> {
        if (this.server) {
            throw new Error('Server is already running')
        }

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
                            console.log('[Cosy HTTP] Sending JSON response')
                            ctx.response.json(result)
                        }
                    }
                }

                // 运行中间件管道
                console.log('[Cosy HTTP] Executing middleware pipeline')
                await this.pipeline.pipe(finalHandler).execute(ctx.request, ctx.response)

                // 确保响应被发送
                if (!res.headersSent) {
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

        // 启动服务器
        await new Promise<void>((resolve) => {
            this.server?.listen(port, () => {
                console.log(`[Cosy HTTP] Server is running at http://localhost:${port}`)
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
} 
