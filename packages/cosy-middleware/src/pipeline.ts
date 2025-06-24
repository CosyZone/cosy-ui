import {
    MiddlewareHandler,
    MiddlewarePipeline,
    RouteHandler,
    RequestInterface,
    ResponseInterface,
    HttpContextInterface,
    IMiddlewarePipeline,
    IMiddlewareHandler,
    createMiddlewareAdapter,
    createBaseMiddlewareAdapter,
    isIMiddlewareHandler,
    isMiddlewareHandler,
    StoredMiddleware,
    convertToMiddlewareHandler,
    convertToMiddlewareHandlers
} from './types'

export class Pipeline implements MiddlewarePipeline {
    private middlewares: MiddlewareHandler[] = []

    constructor(middlewares: MiddlewareHandler[] = []) {
        this.middlewares = middlewares
    }

    /**
     * 添加单个中间件
     */
    pipe(middleware: MiddlewareHandler): MiddlewarePipeline {
        this.middlewares.push(middleware)
        return this
    }

    /**
     * 添加多个中间件
     */
    through(middlewares: MiddlewareHandler[]): MiddlewarePipeline {
        this.middlewares.push(...middlewares)
        return this
    }

    /**
     * 执行中间件管道
     */
    async execute(request: RequestInterface, response: ResponseInterface): Promise<any> {
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
    }

    /**
     * 添加最终处理器并执行
     */
    async then(finalHandler: RouteHandler): Promise<any> {
        const handler = async (request: RequestInterface, response: ResponseInterface) => {
            await this.execute(request, response)
            return finalHandler(request, response)
        }
        return handler
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
export function pipeline(middlewares: MiddlewareHandler[] = []): MiddlewarePipeline {
    return new Pipeline(middlewares)
}
