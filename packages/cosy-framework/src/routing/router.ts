import {
    RouterInterface,
    RouteInterface,
    RouteHandler,
    RouteMatch,
    RouteGroupOptions,
    MiddlewareHandler,
    HttpMethod
} from '../types'
import { Route } from './route'
import { DefaultRouteCompiler } from './compiler'

export class Router implements RouterInterface {
    private routes: RouteInterface[] = []
    private compiler = new DefaultRouteCompiler()
    private groupStack: RouteGroupOptions[] = []

    /**
     * GET 路由
     */
    get(path: string, handler: RouteHandler): RouteInterface {
        return this.addRoute(HttpMethod.GET, path, handler)
    }

    /**
     * POST 路由
     */
    post(path: string, handler: RouteHandler): RouteInterface {
        return this.addRoute(HttpMethod.POST, path, handler)
    }

    /**
     * PUT 路由
     */
    put(path: string, handler: RouteHandler): RouteInterface {
        return this.addRoute(HttpMethod.PUT, path, handler)
    }

    /**
     * PATCH 路由
     */
    patch(path: string, handler: RouteHandler): RouteInterface {
        return this.addRoute(HttpMethod.PATCH, path, handler)
    }

    /**
     * DELETE 路由
     */
    delete(path: string, handler: RouteHandler): RouteInterface {
        return this.addRoute(HttpMethod.DELETE, path, handler)
    }

    /**
     * OPTIONS 路由
     */
    options(path: string, handler: RouteHandler): RouteInterface {
        return this.addRoute(HttpMethod.OPTIONS, path, handler)
    }

    /**
     * HEAD 路由
     */
    head(path: string, handler: RouteHandler): RouteInterface {
        return this.addRoute(HttpMethod.HEAD, path, handler)
    }

    /**
     * 匹配任意方法的路由
     */
    any(path: string, handler: RouteHandler): RouteInterface {
        return this.addRoute(Object.values(HttpMethod), path, handler)
    }

    /**
     * 匹配指定方法的路由
     */
    match(methods: string[], path: string, handler: RouteHandler): RouteInterface {
        return this.addRoute(methods, path, handler)
    }

    /**
     * 路由组
     */
    group(
        optionsOrPrefix: string | RouteGroupOptions,
        callback: (router: RouterInterface) => void
    ): void {
        const options: RouteGroupOptions = typeof optionsOrPrefix === 'string'
            ? { prefix: optionsOrPrefix }
            : optionsOrPrefix

        this.groupStack.push(options)
        callback(this)
        this.groupStack.pop()
    }

    /**
     * 添加中间件（用于链式调用）
     */
    middleware(middleware: MiddlewareHandler | MiddlewareHandler[]): RouterInterface {
        // 这个方法返回一个新的路由器实例，用于链式调用
        const newRouter = new Router()
        newRouter.routes = [...this.routes]
        newRouter.compiler = this.compiler
        newRouter.groupStack = [...this.groupStack, { middleware }]
        return newRouter
    }

    /**
     * 设置路由名称前缀（用于链式调用）
     */
    name(namePrefix: string): RouterInterface {
        const newRouter = new Router()
        newRouter.routes = [...this.routes]
        newRouter.compiler = this.compiler
        newRouter.groupStack = [...this.groupStack, { name: namePrefix }]
        return newRouter
    }

    /**
     * 设置域名约束（用于链式调用）
     */
    domain(domain: string): RouterInterface {
        const newRouter = new Router()
        newRouter.routes = [...this.routes]
        newRouter.compiler = this.compiler
        newRouter.groupStack = [...this.groupStack, { domain }]
        return newRouter
    }

    /**
     * 解析路由
     */
    resolve(method: string, path: string): RouteMatch | null {
        for (const route of this.routes as Route[]) {
            if (!route.matchesMethod(method)) {
                continue
            }

            const matchResult = this.compiler.match(route.compiled, path)

            if (matchResult) {
                return {
                    route,
                    params: matchResult.params
                }
            }
        }

        return null
    }

    /**
     * 获取所有路由
     */
    getRoutes(): RouteInterface[] {
        return [...this.routes]
    }

    /**
     * 添加路由
     */
    private addRoute(method: string | string[], path: string, handler: RouteHandler): RouteInterface {
        // 应用路由组的配置
        const groupOptions = this.mergeGroupOptions()

        // 处理路径前缀
        if (groupOptions.prefix) {
            path = this.joinPaths(groupOptions.prefix, path)
        }

        const route = new Route(method, path, handler)

        // 编译路由并存储
        route.compiled = this.compiler.compile(route.path)

        // 应用路由组的中间件
        if (groupOptions.middleware) {
            route.addMiddleware(groupOptions.middleware)
        }

        // 应用路由组的域名
        if (groupOptions.domain) {
            route.setDomain(groupOptions.domain)
        }

        // 应用路由组的名称前缀
        if (groupOptions.name && route.name) {
            route.setName(groupOptions.name + route.name)
        }

        this.routes.push(route)
        return route
    }

    /**
     * 合并路由组配置
     */
    private mergeGroupOptions(): RouteGroupOptions {
        const merged: RouteGroupOptions = {}

        for (const group of this.groupStack) {
            if (group.prefix) {
                merged.prefix = this.joinPaths(merged.prefix || '', group.prefix)
            }

            if (group.middleware) {
                const middlewares = Array.isArray(group.middleware) ? group.middleware : [group.middleware]
                merged.middleware = [...(merged.middleware as MiddlewareHandler[] || []), ...middlewares]
            }

            if (group.domain) {
                merged.domain = group.domain
            }

            if (group.name) {
                merged.name = (merged.name || '') + group.name
            }
        }

        return merged
    }

    /**
     * 连接路径
     */
    private joinPaths(prefix: string, path: string): string {
        prefix = prefix.replace(/\/$/, '') // 移除尾部斜杠
        path = path.replace(/^\//, '') // 移除开头斜杠
        return `${prefix}/${path}`.replace(/\/+/g, '/') // 合并多个斜杠
    }
} 
