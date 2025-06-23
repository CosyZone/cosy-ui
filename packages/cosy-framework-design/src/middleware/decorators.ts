import { MiddlewareType } from './constants';

/**
 * 中间件装饰器选项
 */
export interface IMiddlewareOptions {
    /**
     * 中间件类型
     */
    type?: MiddlewareType;

    /**
     * 中间件顺序
     */
    order?: number;
}

/**
 * 中间件装饰器类型
 */
export type MiddlewareDecorator = (options?: IMiddlewareOptions) => ClassDecorator; 
