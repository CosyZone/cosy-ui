import { IRouteHandler, IMiddlewareHandler } from '../middleware'
import { RouteInterface } from './RouteInterface'

/**
 * 路由匹配结果
 */
export interface RouteMatch {
    route: RouteInterface
    params: Record<string, string>
    middleware?: IMiddlewareHandler | IMiddlewareHandler[]
    name?: string
    domain?: string
    namespace?: string
    handler: IRouteHandler
} 
