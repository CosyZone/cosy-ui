import {
    MiddlewarePipeline,
    MiddlewareHandler,
    RouteHandler,
    HttpContextInterface,
    NextFunction
} from '../types'

export class Pipeline implements MiddlewarePipeline {
    private middlewares: MiddlewareHandler[] = []

    constructor(middlewares: MiddlewareHandler[] = []) {
        this.middlewares = [...middlewares]
    }

    /**
     * 添加单个中间件到管道
     */
    pipe(middleware: MiddlewareHandler): MiddlewarePipeline {
        return new Pipeline([...this.middlewares, middleware])
    }

    /**
     * 添加多个中间件到管道
     */
    through(middlewares: MiddlewareHandler[]): MiddlewarePipeline {
        return new Pipeline([...this.middlewares, ...middlewares])
    }

    /**
     * 执行管道并返回最终结果
     */
    async then(finalHandler: RouteHandler): Promise<any> {
        if (this.middlewares.length === 0) {
            return finalHandler
        }

        return this.createMiddlewareChain(finalHandler)
    }

    /**
     * 执行整个中间件管道
     */
    async execute(context: HttpContextInterface): Promise<any> {
        if (this.middlewares.length === 0) {
            return
        }

        const chain = this.createExecutionChain(context)
        return chain()
    }

    /**
     * 创建中间件执行链
     */
    private createMiddlewareChain(finalHandler: RouteHandler): MiddlewareHandler {
        return async (context: HttpContextInterface, next: NextFunction) => {
            let index = 0

            const executeNext: NextFunction = async () => {
                if (index >= this.middlewares.length) {
                    // 所有中间件都执行完了，执行最终处理器
                    return finalHandler(context)
                }

                const middleware = this.middlewares[index++]!
                return middleware(context, executeNext)
            }

            return executeNext()
        }
    }

    /**
     * 创建执行链（不需要最终处理器）
     */
    private createExecutionChain(context: HttpContextInterface): () => Promise<any> {
        let index = 0

        const executeNext = async (): Promise<any> => {
            if (index >= this.middlewares.length) {
                return
            }

            const middleware = this.middlewares[index++]!
            return middleware(context, executeNext)
        }

        return executeNext
    }

    /**
     * 获取所有中间件
     */
    getMiddlewares(): MiddlewareHandler[] {
        return [...this.middlewares]
    }

    /**
     * 获取中间件数量
     */
    count(): number {
        return this.middlewares.length
    }

    /**
     * 创建静态管道
     */
    static create(middlewares: MiddlewareHandler[] = []): MiddlewarePipeline {
        return new Pipeline(middlewares)
    }
}
