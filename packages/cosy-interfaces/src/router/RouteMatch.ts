import { IRouteHandler, IMiddlewareHandler } from '../middleware'
import { IRoute } from './Route.js'

/**
 * 路由匹配结果
 */
export interface IRouteMatch {
    route: IRoute
    params: Record<string, string>
    middleware?: IMiddlewareHandler | IMiddlewareHandler[]
    name?: string
    domain?: string
    namespace?: string
    handler: IRouteHandler
} 
