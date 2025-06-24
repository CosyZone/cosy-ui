import { Constructor } from "./common"

/**
 * 服务标识符类型
 */
export type ServiceIdentifier = string | symbol | Constructor<any>

/**
 * 服务绑定信息
 */
export interface IServiceBinding<T = any> {
    token: ServiceIdentifier
    implementation: Constructor<T>
    singleton: boolean
    instance?: T
}

/**
 * 容器接口
 */
export interface IContainer {
    /**
     * 注册瞬态服务
     */
    bind<T>(token: ServiceIdentifier, implementation: Constructor<T>, singleton?: boolean): void

    /**
     * 注册单例服务
     */
    singleton<T>(token: ServiceIdentifier, implementation: Constructor<T>): void

    /**
     * 解析服务
     */
    resolve<T>(token: ServiceIdentifier): T

    /**
     * 创建类的新实例
     */
    make<T>(implementation: Constructor<T>): T

    /**
     * 检查服务是否存在
     */
    has(token: ServiceIdentifier): boolean

    /**
     * 注册实例
     */
    instance<T>(token: ServiceIdentifier, instance: T): void
}

/**
 * 服务提供者接口
 */
export interface IServiceProvider {
    /**
     * 注册服务
     */
    register(container: IContainer): void

    /**
     * 启动服务
     */
    boot?(container: IContainer): void
}

/**
 * 装饰器元数据常量
 */
export const INJECTABLE_TOKEN = Symbol('INJECTABLE')
export const INJECT_TOKEN = Symbol('INJECT')
export const DEPENDENCIES_TOKEN = Symbol('DEPENDENCIES') 
