/**
 * 基础类型
 */
export type Constructor<T = any> = new (...args: any[]) => T
export type ClassDecorator = <T extends Constructor>(target: T) => T | void
export type MethodDecorator = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void
export type ParameterDecorator = (target: any, propertyKey: string, parameterIndex: number) => void

/**
 * 工具类型
 */
export type Awaitable<T> = T | Promise<T>
export type Optional<T> = T | undefined
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]

/**
 * 应用程序选项
 */
export interface ApplicationOptions {
    debug?: boolean
    env?: 'development' | 'production' | 'testing'
    port?: number
    host?: string
    configPath?: string
    providers?: Constructor<ServiceProvider>[]
    hooks?: {
        beforeBoot?: () => Promise<void>
        afterBoot?: () => Promise<void>
        beforeStart?: () => Promise<void>
        afterStart?: () => Promise<void>
        beforeStop?: () => Promise<void>
        afterStop?: () => Promise<void>
    }
}

/**
 * 服务提供者
 */
export interface ServiceProvider {
    register(): void
    boot?(): Promise<void>
}

/**
 * HTTP 相关类型
 */
export interface Request {
    method: string
    path: string
    params: Record<string, string>
    query: Record<string, string>
    headers: Record<string, string>
    body: any
}

export interface Response {
    status(code: number): this
    header(name: string, value: string): this
    send(data: any): void
    json(data: any): void
}

/**
 * HTTP方法枚举
 */
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD'
} 
