import { IHttpContext } from '../http';
import { MiddlewareHandler, NextFunction } from './types';
import { MiddlewareType } from './constants';

/**
 * 中间件接口
 */
export interface IMiddleware {
    /**
     * 获取中间件配置
     */
    getConfig(): IMiddlewareConfig;

    /**
     * 执行中间件
     */
    execute(context: IHttpContext, next: NextFunction): Promise<void>;
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
    handle(error: Error, context: IHttpContext, next: NextFunction): Promise<void>;
}

/**
 * 中间件管理器接口
 */
export interface IMiddlewareManager {
    /**
     * 注册中间件
     */
    register(middleware: IMiddleware): void;

    /**
     * 注册全局中间件
     */
    useGlobal(middleware: IMiddleware): void;

    /**
     * 创建中间件链
     */
    createChain(middlewares: IMiddleware[]): MiddlewareHandler;
}

/**
 * 中间件工厂接口
 */
export interface IMiddlewareFactory {
    /**
     * 创建中间件
     */
    create(config: IMiddlewareConfig): IMiddleware;

    /**
     * 创建中间件链
     */
    createChain(middlewares: IMiddleware[]): MiddlewareHandler;
}

/**
 * 中间件上下文接口
 */
export interface IMiddlewareContext extends IHttpContext {
    /**
     * 中间件特定状态
     */
    middlewareState: Map<string, any>;

    /**
     * 获取中间件状态
     */
    getMiddlewareState<T>(key: string): T | undefined;

    /**
     * 设置中间件状态
     */
    setMiddlewareState<T>(key: string, value: T): void;
}

/**
 * 中间件错误处理器
 */
export interface IMiddlewareErrorHandler {
    /**
     * 处理中间件错误
     */
    handleError(error: Error, context: IMiddlewareContext): Promise<void>;
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
