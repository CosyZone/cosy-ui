// 占位符常量
export const ROUTING_TEMP = 'temp';

/**
 * 路由模式枚举
 */
export enum RoutePattern {
    /**
     * 静态路由
     * 例如: /users
     */
    STATIC = 'static',

    /**
     * 参数路由
     * 例如: /users/:id
     */
    PARAMETERIZED = 'parameterized',

    /**
     * 通配符路由
     * 例如: /files/*
     */
    WILDCARD = 'wildcard'
}
