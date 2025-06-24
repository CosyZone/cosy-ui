import { ILifecycleHooks, IServiceProvider } from '@coffic/cosy-interfaces'

/**
 * 应用程序配置接口
 */
export interface ApplicationConfig {
    name?: string
    env?: string
    debug?: boolean
    port?: number
    [key: string]: any
}

/**
 * 启动选项接口
 */
export interface BootstrapOptions {
    config?: ApplicationConfig
    configPath?: string
    providers?: Constructor<IServiceProvider>[]
    hooks?: ILifecycleHooks
}

/**
 * 构造函数类型
 */
export type Constructor<T> = new (...args: any[]) => T
