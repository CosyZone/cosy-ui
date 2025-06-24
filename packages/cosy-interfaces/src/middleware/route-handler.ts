import { RequestInterface, ResponseInterface } from '../http'

/**
 * 路由处理器
 */
export type RouteHandler = (
    request: RequestInterface,
    response: ResponseInterface
) => Promise<void | ResponseInterface> 
