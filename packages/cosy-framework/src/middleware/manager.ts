import { MiddlewareManager, MiddlewareHandler } from '../types'

export class MiddlewareRegistry implements MiddlewareManager {
    private middlewares = new Map<string, MiddlewareHandler>()
    private groups = new Map<string, MiddlewareHandler[]>()
    private globalMiddlewares: MiddlewareHandler[] = []

    /**
     * 注册命名中间件
     */
    register(name: string, middleware: MiddlewareHandler): void {
        this.middlewares.set(name, middleware)
    }

    /**
     * 解析中间件
     */
    resolve(name: string): MiddlewareHandler | undefined {
        return this.middlewares.get(name)
    }

    /**
     * 创建中间件组
     */
    group(name: string, middlewares: (string | MiddlewareHandler)[]): void {
        const resolvedMiddlewares = middlewares.map(middleware => {
            if (typeof middleware === 'string') {
                const resolved = this.resolve(middleware)
                if (!resolved) {
                    throw new Error(`Middleware not found: ${middleware}`)
                }
                return resolved
            }
            return middleware
        })

        this.groups.set(name, resolvedMiddlewares)
    }

    /**
     * 获取中间件组
     */
    getGroup(name: string): MiddlewareHandler[] {
        return this.groups.get(name) || []
    }

    /**
     * 注册全局中间件
     */
    global(middleware: MiddlewareHandler): void {
        this.globalMiddlewares.push(middleware)
    }

    /**
     * 获取所有全局中间件
     */
    getGlobal(): MiddlewareHandler[] {
        return [...this.globalMiddlewares]
    }

    /**
     * 解析中间件列表（支持字符串和函数混合）
     */
    resolveMiddlewares(middlewares: (string | MiddlewareHandler)[]): MiddlewareHandler[] {
        return middlewares.map(middleware => {
            if (typeof middleware === 'string') {
                // 检查是否是组
                const group = this.getGroup(middleware)
                if (group.length > 0) {
                    return group
                }

                // 检查是否是单个中间件
                const resolved = this.resolve(middleware)
                if (resolved) {
                    return resolved
                }

                throw new Error(`Middleware not found: ${middleware}`)
            }
            return middleware
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
