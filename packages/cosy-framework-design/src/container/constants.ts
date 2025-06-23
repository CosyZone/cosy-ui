/**
 * 服务作用域枚举
 */
export enum ServiceScope {
    /**
     * 单例作用域
     * 整个应用生命周期只创建一个实例
     */
    SINGLETON = 'singleton',

    /**
     * 瞬态作用域
     * 每次解析都创建新实例
     */
    TRANSIENT = 'transient'
}
