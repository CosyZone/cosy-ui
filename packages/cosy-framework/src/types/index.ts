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
