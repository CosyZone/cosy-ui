import { RequestInterface, ResponseInterface } from './http'

/**
 * 中间件处理器
 */
export type IMiddlewareHandler = (
    request: RequestInterface,
    response: ResponseInterface,
    next: () => Promise<void>
) => Promise<void | ResponseInterface>

/**
 * 路由处理器
 */
export type RouteHandler = (
    request: RequestInterface,
    response: ResponseInterface
) => Promise<void | ResponseInterface>

/**
 * 中间件管道
 */
export interface IMiddlewarePipeline {
    pipe(middleware: IMiddlewareHandler): IMiddlewarePipeline
    through(middlewares: IMiddlewareHandler[]): IMiddlewarePipeline
    then(finalHandler: RouteHandler): Promise<any>
    execute(request: RequestInterface, response: ResponseInterface): Promise<any>
    count(): number
}

/**
 * 中间件管理器
 */
export interface IMiddlewareManager {
    register(name: string, middleware: IMiddlewareHandler): void
    resolve(name: string): IMiddlewareHandler | undefined
    group(name: string, middlewares: (string | IMiddlewareHandler)[]): void
    getGroup(name: string): IMiddlewareHandler[]
    global(middleware: IMiddlewareHandler): void
    getGlobal(): IMiddlewareHandler[]
}

/**
 * 条件中间件
 */
export interface IConditionalMiddleware {
    when(condition: (request: RequestInterface, response: ResponseInterface) => boolean): IMiddlewareHandler
    unless(condition: (request: RequestInterface, response: ResponseInterface) => boolean): IMiddlewareHandler
}

/**
 * 中间件选项
 */
export interface MiddlewareOptions {
    except?: string[]
    only?: string[]
    domain?: string
    methods?: string[]
}

/**
 * 中间件上下文
 */
export interface IMiddlewareContext {
    request: RequestInterface
    response: ResponseInterface
    state: Record<string, any>
    skipRemaining(): void
    shouldSkip: boolean
} 
