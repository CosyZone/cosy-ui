import { IMiddleware } from './interfaces';
import { MiddlewareScope } from './constants';

/**
 * 中间件装饰器选项
 */
export interface IMiddlewareOptions {
    /**
     * 中间件作用域
     */
    scope?: MiddlewareScope;

    /**
     * 执行顺序
     */
    order?: number;
}

/**
 * 中间件装饰器类型
 */
export type MiddlewareDecorator = (options?: IMiddlewareOptions) => ClassDecorator & MethodDecorator;

/**
 * Use 装饰器选项
 */
export interface IUseOptions {
    /**
     * 中间件列表
     */
    middlewares: IMiddleware[];

    /**
     * 执行顺序
     */
    order?: number;
}

/**
 * Use 装饰器类型
 */
export type UseDecorator = (options: IUseOptions) => MethodDecorator; 
