import { IContext } from '../middleware';

/**
 * 路由处理函数类型
 */
export type RouteHandler = (context: IContext) => Promise<void>;

/**
 * HTTP 方法类型
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

/**
 * 路由参数类型
 */
export interface IRouteParams {
    [key: string]: string;
}


