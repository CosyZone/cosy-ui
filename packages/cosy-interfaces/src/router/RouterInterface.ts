import { IRouteHandler, IMiddlewareHandler } from '../middleware'
import { RouteInterface } from './RouteInterface'
import { RouteGroupOptions } from './RouteGroupOptions'
import { RouteMatch } from './RouteMatch'

/**
 * 路由器接口
 */
export interface RouterInterface {
    get(path: string, handler: IRouteHandler): RouteInterface
    post(path: string, handler: IRouteHandler): RouteInterface
    put(path: string, handler: IRouteHandler): RouteInterface
    patch(path: string, handler: IRouteHandler): RouteInterface
    delete(path: string, handler: IRouteHandler): RouteInterface
    options(path: string, handler: IRouteHandler): RouteInterface
    head(path: string, handler: IRouteHandler): RouteInterface
    any(path: string, handler: IRouteHandler): RouteInterface
    match(methods: string[], path: string, handler: IRouteHandler): RouteInterface
    group(prefix: string, callback: (router: RouterInterface) => void): void
    group(options: RouteGroupOptions, callback: (router: RouterInterface) => void): void
    middleware(middleware: IMiddlewareHandler | IMiddlewareHandler[]): RouterInterface
    name(name: string): RouterInterface
    domain(domain: string): RouterInterface
    resolve(method: string, path: string): RouteMatch | null
    getRoutes(): RouteInterface[]
} 
