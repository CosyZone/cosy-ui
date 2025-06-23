import { IMiddleware } from '../middleware';
import { IRouteConstraints } from './types';

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

    /**
     * 路由约束
     */
    constraints?: IRouteConstraints;
}

/**
 * 路由方法装饰器类型
 */
export type RouteMethodDecorator = (options: IRouteMethodOptions) => MethodDecorator;

/**
 * HTTP 方法装饰器
 */
export interface IHttpMethodDecorators {
    Get(path: string, options?: Omit<IRouteMethodOptions, 'path'>): MethodDecorator;
    Post(path: string, options?: Omit<IRouteMethodOptions, 'path'>): MethodDecorator;
    Put(path: string, options?: Omit<IRouteMethodOptions, 'path'>): MethodDecorator;
    Delete(path: string, options?: Omit<IRouteMethodOptions, 'path'>): MethodDecorator;
    Patch(path: string, options?: Omit<IRouteMethodOptions, 'path'>): MethodDecorator;
} 
