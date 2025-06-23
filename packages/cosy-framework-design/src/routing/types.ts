import { IHttpContext, HttpMethod } from '../http';

/**
 * 路由处理函数类型
 */
export type RouteHandler = (context: IHttpContext) => Promise<void>;

/**
 * 路由参数类型
 */
export interface IRouteParams {
    [key: string]: string;
}

/**
 * 路由约束类型
 */
export interface IRouteConstraints {
    [key: string]: RegExp | ((value: string) => boolean);
}

// Re-export HttpMethod for convenience
export { HttpMethod };


