import { IMiddlewareHandler, IMiddlewarePipeline, IRequest, ResponseInterface, RouteHandler } from '@coffic/cosy-interfaces'

export class Pipeline implements IMiddlewarePipeline {
    private middlewares: IMiddlewareHandler[] = []
    private finalHandler?: RouteHandler

    constructor(middlewares: IMiddlewareHandler[] = []) {
        this.middlewares = middlewares
        console.log('[Cosy HTTP] Pipeline created with', middlewares.length, 'middlewares')
    }

    /**
     * 添加单个中间件
     */
    pipe(middleware: IMiddlewareHandler): IMiddlewarePipeline {
        this.middlewares.push(middleware)
        console.log('[Cosy HTTP] Middleware added to pipeline, total:', this.middlewares.length)
        return this
    }

    /**
     * 添加多个中间件
     */
    through(middlewares: IMiddlewareHandler[]): IMiddlewarePipeline {
        this.middlewares.push(...middlewares)
        console.log('[Cosy HTTP] Multiple middlewares added, total:', this.middlewares.length)
        return this
    }

    /**
     * 执行中间件管道
     */
    async execute(request: IRequest, response: ResponseInterface): Promise<any> {
        console.log('[Cosy HTTP] Starting pipeline execution with', this.middlewares.length, 'middlewares')

        let index = 0
        const middlewares = this.middlewares

        const next = async (): Promise<void> => {
            const middleware = middlewares[index]
            index++

            if (middleware) {
                console.log(`[Cosy HTTP] Executing middleware ${index}/${middlewares.length}`)
                await middleware(request, response, next)
            } else {
                console.log('[Cosy HTTP] All middlewares executed')
            }
        }

        await next()
        console.log('[Cosy HTTP] Pipeline execution completed')

        // 执行最终处理器
        if (this.finalHandler) {
            console.log('[Cosy HTTP] Executing final handler')
            return this.finalHandler(request, response)
        }
    }

    /**
     * 获取所有中间件
     */
    getMiddlewares(): IMiddlewareHandler[] {
        return [...this.middlewares]
    }

    /**
     * 获取中间件数量
     */
    count(): number {
        return this.middlewares.length
    }

    /**
     * 添加最终处理器并执行
     */
    async then(finalHandler: RouteHandler): Promise<any> {
        this.finalHandler = finalHandler
        return this
    }
}

/**
 * 创建中间件管道
 */
export function pipeline(middlewares: IMiddlewareHandler[] = []): IMiddlewarePipeline {
    return new Pipeline(middlewares)
} 
