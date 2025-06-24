import { IRouteHandler, IMiddlewareHandler } from '../middleware'
import { IRoute } from './Route'
import { IRouteGroupOptions } from './RouteGroupOptions'
import { IRouteMatch } from './RouteMatch'

/**
 * 路由器接口
 */
export interface IRouter {
    get(path: string, handler: IRouteHandler): IRoute
    post(path: string, handler: IRouteHandler): IRoute
    put(path: string, handler: IRouteHandler): IRoute
    patch(path: string, handler: IRouteHandler): IRoute
    delete(path: string, handler: IRouteHandler): IRoute
    options(path: string, handler: IRouteHandler): IRoute
    head(path: string, handler: IRouteHandler): IRoute
    any(path: string, handler: IRouteHandler): IRoute
    match(methods: string[], path: string, handler: IRouteHandler): IRoute
    group(prefix: string, callback: (router: IRouter) => void): void
    group(options: IRouteGroupOptions, callback: (router: IRouter) => void): void
    middleware(middleware: IMiddlewareHandler | IMiddlewareHandler[]): IRouter
    name(name: string): IRouter
    domain(domain: string): IRouter
    resolve(method: string, path: string): IRouteMatch | null
    getRoutes(): IRoute[]
} 
