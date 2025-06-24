import { IRequest, ResponseInterface } from './http'

/**
 * 路由处理器
 */
export type IRouteHandler = (
    request: IRequest,
    response: ResponseInterface
) => Promise<void | ResponseInterface>

