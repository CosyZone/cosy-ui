import { RequestInterface, ResponseInterface } from './http'
import { MiddlewareHandler, RouteHandler } from './middleware'

/**
 * 路由接口
 */
export interface RouteInterface {
    method: string | string[]
    path: string
    handler: RouteHandler
    name?: string
    middleware?: MiddlewareHandler[]
    domain?: string
    matchesMethod(method: string): boolean
}

/**
 * 路由器接口
 */
export interface RouterInterface {
    get(path: string, handler: RouteHandler): RouteInterface
    post(path: string, handler: RouteHandler): RouteInterface
    put(path: string, handler: RouteHandler): RouteInterface
    patch(path: string, handler: RouteHandler): RouteInterface
    delete(path: string, handler: RouteHandler): RouteInterface
    options(path: string, handler: RouteHandler): RouteInterface
    head(path: string, handler: RouteHandler): RouteInterface
    any(path: string, handler: RouteHandler): RouteInterface
    match(methods: string[], path: string, handler: RouteHandler): RouteInterface
    group(prefix: string, callback: (router: RouterInterface) => void): void
    group(options: RouteGroupOptions, callback: (router: RouterInterface) => void): void
    middleware(middleware: MiddlewareHandler | MiddlewareHandler[]): RouterInterface
    name(name: string): RouterInterface
    domain(domain: string): RouterInterface
    resolve(method: string, path: string): RouteMatch | null
    getRoutes(): RouteInterface[]
}

/**
 * 路由匹配结果
 */
export interface RouteMatch {
    route: RouteInterface
    params: Record<string, string>
    middleware?: MiddlewareHandler | MiddlewareHandler[]
    name?: string
    domain?: string
    namespace?: string
    handler: RouteHandler
}

/**
 * 路由组选项
 */
export interface RouteGroupOptions {
    prefix?: string
    middleware?: MiddlewareHandler | MiddlewareHandler[]
    name?: string
    domain?: string
    namespace?: string
}

/**
 * 路由编译器接口
 */
export interface RouteCompiler {
    compile(path: string): CompiledRoute
    match(compiledRoute: CompiledRoute, path: string): RouteMatchResult | null
}

/**
 * 编译后的路由
 */
export interface CompiledRoute {
    pattern: RegExp
    paramNames: string[]
    path: string
}

/**
 * 路由匹配结果
 */
export interface RouteMatchResult {
    params: Record<string, string>
} 
