import { IHttpContext } from '../http';

/**
 * 中间件上下文类型
 */
export interface IContext {
    /**
     * 请求对象
     */
    request: Request;

    /**
     * 响应对象
     */
    response: Response;

    /**
     * 自定义数据
     */
    state: Record<string, any>;
}

/**
 * 下一个中间件函数类型
 */
export type NextFunction = () => Promise<void>;

/**
 * 中间件处理函数类型
 */
export type MiddlewareHandler = (context: IHttpContext, next: NextFunction) => Promise<void>;

/**
 * 中间件配置类型
 */
export interface IMiddlewareConfig {
    /**
     * 中间件名称
     */
    name: string;

    /**
     * 中间件处理函数
     */
    handler: MiddlewareHandler;

    /**
     * 执行顺序
     */
    order?: number;
}
