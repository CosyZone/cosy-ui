import { RouteInterface, RouteHandler, MiddlewareHandler, CompiledRoute } from '../types'

export class Route implements RouteInterface {
    public method: string | string[]
    public path: string
    public handler: RouteHandler
    public name?: string
    public middleware: MiddlewareHandler[] = []
    public constraints: Record<string, RegExp | string> = {}
    public domain?: string
    public compiled!: CompiledRoute

    constructor(
        method: string | string[],
        path: string,
        handler: RouteHandler
    ) {
        this.method = Array.isArray(method) ? method : [method]
        this.path = this.normalizePath(path)
        this.handler = handler
    }

    /**
     * 设置路由名称
     */
    setName(name: string): this {
        this.name = name
        return this
    }

    /**
     * 添加中间件
     */
    addMiddleware(middleware: MiddlewareHandler | MiddlewareHandler[]): this {
        const middlewares = Array.isArray(middleware) ? middleware : [middleware]
        this.middleware.push(...middlewares)
        return this
    }

    /**
     * 设置域名
     */
    setDomain(domain: string): this {
        this.domain = domain
        return this
    }

    /**
     * 检查是否匹配指定方法
     */
    matchesMethod(method: string): boolean {
        return (this.method as string[]).includes(method.toUpperCase())
    }

    /**
     * 标准化路径
     */
    private normalizePath(path: string): string {
        // 确保以 / 开头
        if (!path.startsWith('/')) {
            path = '/' + path
        }

        // 移除尾部的 /（除非是根路径）
        if (path.length > 1 && path.endsWith('/')) {
            path = path.slice(0, -1)
        }

        return path
    }

    /**
     * 获取路由信息
     */
    toObject(): object {
        return {
            method: this.method,
            path: this.path,
            name: this.name,
            middleware: this.middleware.length,
            domain: this.domain
        }
    }
} 
