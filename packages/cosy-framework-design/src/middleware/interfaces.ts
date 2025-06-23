import { IContext, NextFunction } from './types';
import { MiddlewareType } from './constants';

/**
 * 中间件接口
 */
export interface IMiddleware {
    /**
     * 处理请求
     * @param context 上下文对象
     * @param next 下一个中间件
     */
    handle(context: IContext, next: NextFunction): Promise<void>;
}

/**
 * 错误处理中间件接口
 */
export interface IErrorMiddleware {
    /**
     * 处理错误
     * @param error 错误对象
     * @param context 上下文对象
     * @param next 下一个中间件
     */
    handle(error: Error, context: IContext, next: NextFunction): Promise<void>;
}

/**
 * 中间件管理器接口
 */
export interface IMiddlewareManager {
    /**
     * 添加中间件
     * @param middleware 中间件实例
     * @param type 中间件类型
     */
    use(middleware: IMiddleware, type?: MiddlewareType): void;

    /**
     * 执行中间件链
     * @param context 上下文对象
     */
    execute(context: IContext): Promise<void>;
}

/**
 * 中间件配置
 */
export interface IMiddlewareConfig {
    /**
     * 中间件实例
     */
    middleware: IMiddleware;

    /**
     * 中间件类型
     */
    type: MiddlewareType;

    /**
     * 执行顺序
     */
    order: number;
}

/**
 * 中间件组配置
 */
export interface IMiddlewareGroupConfig {
    /**
     * 路径前缀
     */
    prefix?: string;

    /**
     * 中间件列表
     */
    middlewares: IMiddleware[];
}
