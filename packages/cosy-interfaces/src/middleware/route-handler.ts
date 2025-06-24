import { IRequest, ResponseInterface } from '../http'

/**
 * 路由处理器
 */
export type RouteHandler = (
    request: IRequest,
    response: ResponseInterface
) => Promise<void | ResponseInterface> 
