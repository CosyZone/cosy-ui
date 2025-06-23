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

/**
 * 中间件作用域枚举
 */
export enum MiddlewareScope {
    /**
     * 全局中间件
     */
    GLOBAL = 'global',

    /**
     * 路由中间件
     */
    ROUTE = 'route',

    /**
     * 控制器中间件
     */
    CONTROLLER = 'controller'
}
