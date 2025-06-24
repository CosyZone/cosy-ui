import { IMiddlewareHandler, IMiddlewarePipeline, IRequest, ResponseInterface, IRouteHandler } from '@coffic/cosy-interfaces'

export class Pipeline implements IMiddlewarePipeline {
    private middlewares: IMiddlewareHandler[] = []
    private finalHandler?: IRouteHandler

    constructor(middlewares: IMiddlewareHandler[] = []) {
        this.middlewares = middlewares
    }

    /**
     * 获取所有中间件
     */
    getMiddlewares(): IMiddlewareHandler[] {
        return [...this.middlewares]
    }

    /**
     * 添加单个中间件
     */
    pipe(middleware: IMiddlewareHandler): IMiddlewarePipeline {
        this.middlewares.push(middleware)
        return this
    }

    /**
     * 添加多个中间件
     */
    through(middlewares: IMiddlewareHandler[]): IMiddlewarePipeline {
        this.middlewares.push(...middlewares)
        return this
    }

    /**
     * 执行中间件管道
     */
    async execute(request: IRequest, response: ResponseInterface): Promise<any> {
        if (!this.finalHandler) {
            throw new Error('No final handler set. Call then() before execute().')
        }

        let index = 0
        const middlewares = this.middlewares

        const next = async (): Promise<void> => {
            const middleware = middlewares[index]
            index++

            if (middleware) {
                await middleware(request, response, next)
            }
        }

        await next()

        // 执行最终处理器
        return this.finalHandler(request, response)
    }

    /**
     * 添加最终处理器并执行
     */
    async then(finalHandler: IRouteHandler): Promise<any> {
        this.finalHandler = finalHandler
        return this
    }

    /**
     * 获取中间件数量
     */
    count(): number {
        return this.middlewares.length
    }
}

/**
 * 创建中间件管道
 */
export function pipeline(middlewares: IMiddlewareHandler[] = []): IMiddlewarePipeline {
    return new Pipeline(middlewares)
}
