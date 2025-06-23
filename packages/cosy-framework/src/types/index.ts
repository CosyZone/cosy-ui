// 基础类型定义
export type Constructor<T = {}> = new (...args: any[]) => T

// 装饰器类型
export interface ClassDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void
}

export interface MethodDecorator {
    <T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void
}

export interface ParameterDecorator {
    (target: any, propertyKey: string | symbol | undefined, parameterIndex: number): void
}

// 服务容器类型
export interface ServiceBinding<T = any> {
    token: string | symbol
    implementation: Constructor<T>
    singleton: boolean
    instance?: T
}

// HTTP 类型
export type RouteHandler = (...args: any[]) => any
export type NextFunction = (request?: any) => Promise<any>

// 通用工具类型
export type Awaitable<T> = T | Promise<T>
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

// 服务容器扩展类型
export interface Container {
    bind<T>(token: string | symbol, implementation: Constructor<T>, singleton?: boolean): void
    singleton<T>(token: string | symbol, implementation: Constructor<T>): void
    resolve<T>(token: string | symbol): T
    make<T>(implementation: Constructor<T>): T
    has(token: string | symbol): boolean
    instance<T>(token: string | symbol, instance: T): void
}

export interface ServiceProvider {
    register(container: Container): void
    boot?(container: Container): void
}

// 装饰器元数据
export const INJECTABLE_TOKEN = Symbol('injectable')
export const INJECT_TOKEN = Symbol('inject')
export const DEPENDENCIES_TOKEN = Symbol('dependencies')
