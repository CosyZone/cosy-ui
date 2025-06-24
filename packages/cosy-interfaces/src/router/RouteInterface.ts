import { IRouteHandler, IMiddlewareHandler } from '../middleware'

/**
 * 路由接口
 */
export interface RouteInterface {
    method: string | string[]
    path: string
    handler: IRouteHandler
    name?: string
    middleware?: IMiddlewareHandler[]
    domain?: string
    matchesMethod(method: string): boolean
} 
