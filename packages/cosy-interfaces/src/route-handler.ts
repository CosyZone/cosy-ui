import { IRequest, ResponseInterface } from './http/index.js'

/**
 * 路由处理器
 */
export type IRouteHandler = (
    request: IRequest,
    response: ResponseInterface
) => Promise<void | ResponseInterface>

