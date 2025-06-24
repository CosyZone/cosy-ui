import { IMiddlewareHandler, IMiddlewarePipeline, IRequest, ResponseInterface, IRouteHandler, ILogger, PipelineConfig } from '@coffic/cosy-interfaces'

export class Pipeline implements IMiddlewarePipeline {
    private middlewares: IMiddlewareHandler[] = []
    private finalHandler?: IRouteHandler
    private logger: ILogger

    constructor(middlewares: IMiddlewareHandler[] = [], config: PipelineConfig = {}) {
        this.middlewares = middlewares

        // 如果没有提供日志记录器，使用一个简单的控制台适配器
        this.logger = config.logger || {
            info: (msg: string) => console.log(`[Cosy Middleware] ${msg}`),
            error: (msg: string, context?: any) => console.error(`[Cosy Middleware] ${msg}`, context),
            warn: (msg: string) => console.warn(`[Cosy Middleware] ${msg}`),
            debug: (msg: string, context?: any) => console.debug(`[Cosy Middleware] ${msg}`, context),
            log: (level: any, msg: string) => console.log(`[Cosy Middleware] ${msg}`),
            child: (name: string) => this.logger
        }

        this.logger.info('Pipeline created', {
            middlewareCount: middlewares.length,
            hasLogger: !!config.logger,
            loggerType: config.logger ? 'provided' : 'default'
        })
        this.logger.debug('Pipeline debug test')
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
        this.logger.debug('Middleware added to pipeline', {
            name: middleware.name,
            total: this.middlewares.length
        })
        return this
    }

    /**
     * 添加多个中间件
     */
    through(middlewares: IMiddlewareHandler[]): IMiddlewarePipeline {
        this.middlewares.push(...middlewares)
        this.logger.debug('Multiple middlewares added', {
            count: middlewares.length,
            total: this.middlewares.length,
            names: middlewares.map(m => m.name)
        })
        return this
    }

    /**
     * 执行中间件管道
     */
    async execute(request: IRequest, response: ResponseInterface): Promise<any> {
        if (!this.finalHandler) {
            throw new Error('No final handler set. Call then() before execute().')
        }

        const pipelineLogger = this.logger.child('execution')
        pipelineLogger.debug('Starting pipeline execution', {
            middlewareCount: this.middlewares.length,
            method: request.method,
            path: request.path
        })

        let index = 0
        const middlewares = this.middlewares

        const next = async (): Promise<void> => {
            const middleware = middlewares[index]
            index++

            if (middleware) {
                pipelineLogger.debug('Executing middleware', {
                    name: middleware.name,
                    current: index,
                    total: middlewares.length
                })
                await middleware(request, response, next)
            } else {
                pipelineLogger.debug('All middlewares executed')
            }
        }

        try {
            await next()
            pipelineLogger.debug('Pipeline execution completed successfully')

            // 执行最终处理器
            pipelineLogger.debug('Executing final handler')
            return this.finalHandler(request, response)
        } catch (error) {
            pipelineLogger.error('Pipeline execution failed', { error })
            throw error
        }
    }

    /**
     * 添加最终处理器并执行
     */
    async then(finalHandler: IRouteHandler): Promise<any> {
        this.finalHandler = finalHandler
        this.logger.debug('Final handler set')
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
export function pipeline(middlewares: IMiddlewareHandler[] = [], config: PipelineConfig = {}): IMiddlewarePipeline {
    return new Pipeline(middlewares, config)
}
