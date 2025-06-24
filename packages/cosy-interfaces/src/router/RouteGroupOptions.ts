import { IMiddlewareHandler } from '../middleware'

/**
 * 路由组选项
 */
export interface RouteGroupOptions {
    prefix?: string
    middleware?: IMiddlewareHandler | IMiddlewareHandler[]
    name?: string
    domain?: string
    namespace?: string
} 
