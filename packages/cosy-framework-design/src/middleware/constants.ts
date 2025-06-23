
/**
 * 中间件类型枚举
 */
export enum MiddlewareType {
    /**
     * 全局中间件
     */
    GLOBAL = 'global',

    /**
     * 路由中间件
     */
    ROUTE = 'route',

    /**
     * 错误处理中间件
     */
    ERROR = 'error'
}
