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
 * 下一个中间件函数
 */
export type NextFunction = () => Promise<void>;