import { RequestInterface, ResponseInterface } from './http'

/**
 * 中间件处理器
 */
export type MiddlewareHandler = (
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
export interface MiddlewarePipeline {
    pipe(middleware: MiddlewareHandler): MiddlewarePipeline
    through(middlewares: MiddlewareHandler[]): MiddlewarePipeline
    then(finalHandler: RouteHandler): Promise<any>
    execute(request: RequestInterface, response: ResponseInterface): Promise<any>
    count(): number
}

/**
 * 中间件管理器
 */
export interface MiddlewareManager {
    register(name: string, middleware: MiddlewareHandler): void
    resolve(name: string): MiddlewareHandler | undefined
    group(name: string, middlewares: (string | MiddlewareHandler)[]): void
    getGroup(name: string): MiddlewareHandler[]
    global(middleware: MiddlewareHandler): void
    getGlobal(): MiddlewareHandler[]
}

/**
 * 条件中间件
 */
export interface ConditionalMiddleware {
    when(condition: (request: RequestInterface, response: ResponseInterface) => boolean): MiddlewareHandler
    unless(condition: (request: RequestInterface, response: ResponseInterface) => boolean): MiddlewareHandler
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
export interface MiddlewareContext {
    request: RequestInterface
    response: ResponseInterface
    state: Record<string, any>
    skipRemaining(): void
    shouldSkip: boolean
} 
