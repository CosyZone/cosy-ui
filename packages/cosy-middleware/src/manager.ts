import { IMiddlewareHandler, IMiddlewareManager } from '@coffic/cosy-interfaces'
import { convertToMiddlewareHandler, convertToIMiddlewareHandler, convertToIMiddlewareHandlers, StoredMiddleware } from './types'

export class MiddlewareRegistry implements IMiddlewareManager {
    private middlewares: Map<string, StoredMiddleware> = new Map()
    private groups: Map<string, StoredMiddleware[]> = new Map()
    private globalMiddlewares: StoredMiddleware[] = []

    /**
     * 注册命名中间件
     */
    register(name: string, middleware: IMiddlewareHandler): void {
        this.middlewares.set(name, convertToMiddlewareHandler(middleware))
    }

    /**
     * 解析中间件
     */
    resolve(name: string): IMiddlewareHandler | undefined {
        const middleware = this.middlewares.get(name)
        if (!middleware) return undefined
        return middleware
    }

    /**
     * 创建中间件组
     */
    group(name: string, middlewares: (string | IMiddlewareHandler | IMiddlewareHandler)[]): void {
        const resolvedMiddlewares: StoredMiddleware[] = []

        for (const middleware of middlewares) {
            if (typeof middleware === 'string') {
                const resolved = this.resolve(middleware)
                if (!resolved) {
                    throw new Error(`Middleware ${middleware} not found`)
                }
                resolvedMiddlewares.push(resolved)
            } else if (typeof middleware === 'function') {
                resolvedMiddlewares.push(convertToMiddlewareHandler(middleware))
            }
        }

        this.groups.set(name, resolvedMiddlewares)
    }

    /**
     * 获取中间件组
     */
    getGroup(name: string): IMiddlewareHandler[] {
        const middlewares = this.groups.get(name) || []
        return convertToIMiddlewareHandlers(middlewares)
    }

    /**
     * 注册全局中间件
     */
    global(middleware: IMiddlewareHandler): void {
        this.globalMiddlewares.push(convertToMiddlewareHandler(middleware))
    }

    /**
     * 获取所有全局中间件
     */
    getGlobal(): IMiddlewareHandler[] {
        return convertToIMiddlewareHandlers(this.globalMiddlewares)
    }

    /**
     * 解析中间件列表（支持字符串和函数混合）
     */
    resolveMiddlewares(middlewares: (string | IMiddlewareHandler)[]): IMiddlewareHandler[] {
        return middlewares.map(middleware => {
            if (typeof middleware === 'string') {
                // 检查是否是组
                const group = this.getGroup(middleware)
                if (group.length > 0) {
                    // 将组中的中间件转换为 MiddlewareHandler 类型
                    return group.map(m => convertToIMiddlewareHandler(m))
                }

                // 检查是否是单个中间件
                const resolved = this.resolve(middleware)
                if (resolved) {
                    return resolved
                }

                throw new Error(`Middleware not found: ${middleware}`)
            }
            return convertToMiddlewareHandler(middleware)
        }).flat()
    }

    /**
     * 获取所有注册的中间件名称
     */
    getRegisteredNames(): string[] {
        return Array.from(this.middlewares.keys())
    }

    /**
     * 获取所有组名称
     */
    getGroupNames(): string[] {
        return Array.from(this.groups.keys())
    }

    /**
     * 清除所有中间件
     */
    clear(): void {
        this.middlewares.clear()
        this.groups.clear()
        this.globalMiddlewares.length = 0
    }
}
