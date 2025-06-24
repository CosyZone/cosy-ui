/**
 * 构造函数类型
 */
export type Constructor<T = any> = new (...args: any[]) => T

/**
 * 服务标识符类型
 */
export type ServiceIdentifier = string | symbol | Constructor<any>

/**
 * 工厂函数类型
 */
export type Factory<T = any> = (...args: any[]) => T

/**
 * 装饰器类型
 */
export type ClassDecorator = (target: any) => void
export type MethodDecorator = (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void
export type ParameterDecorator = (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => void

/**
 * 工具类型
 */
export type Awaitable<T> = T | Promise<T>
export type Optional<T> = T | undefined
export type RequiredKeys<T> = { [K in keyof T]-?: T[K] }

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

/**
 * 服务绑定信息
 */
export interface ServiceBinding<T = any> {
    token: ServiceIdentifier
    implementation: Constructor<T>
    singleton: boolean
    instance?: T
}

/**
 * 容器接口
 */
export interface Container {
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
export interface ServiceProvider {
    /**
     * 注册服务
     */
    register(container: Container): void

    /**
     * 启动服务
     */
    boot?(container: Container): void
}

/**
 * 装饰器元数据常量
 */
export const INJECTABLE_TOKEN = Symbol('INJECTABLE')
export const INJECT_TOKEN = Symbol('INJECT')
export const DEPENDENCIES_TOKEN = Symbol('DEPENDENCIES') 
