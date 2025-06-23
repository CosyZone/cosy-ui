import { IMiddleware } from '../middleware';

/**
 * 控制器装饰器选项
 */
export interface IControllerOptions {
    /**
     * 路由前缀
     */
    prefix?: string;

    /**
     * 中间件列表
     */
    middlewares?: IMiddleware[];
}

/**
 * 控制器装饰器类型
 */
export type ControllerDecorator = (options?: IControllerOptions) => ClassDecorator;

/**
 * 路由方法装饰器选项
 */
export interface IRouteMethodOptions {
    /**
     * 路由路径
     */
    path: string;

    /**
     * 中间件列表
     */
    middlewares?: IMiddleware[];
}

/**
 * 路由方法装饰器类型
 */
export type RouteMethodDecorator = (options: IRouteMethodOptions) => MethodDecorator;

/**
 * HTTP方法装饰器类型
 */
export interface IHttpMethodDecorators {
    Get: RouteMethodDecorator;
    Post: RouteMethodDecorator;
    Put: RouteMethodDecorator;
    Delete: RouteMethodDecorator;
    Patch: RouteMethodDecorator;
} 
