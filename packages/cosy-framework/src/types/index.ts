import { ConfigManager } from '@coffic/cosy-config'
import { Container } from '@coffic/cosy-container'
import { Pipeline } from '@coffic/cosy-middleware'
import { Router } from '@coffic/cosy-router'
import { HttpContextInterface } from '@coffic/cosy-http'

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
 * 生命周期钩子接口
 */
export interface LifecycleHooks {
    beforeBoot?: () => Promise<void> | void
    afterBoot?: () => Promise<void> | void
    beforeStart?: () => Promise<void> | void
    afterStart?: () => Promise<void> | void
    beforeStop?: () => Promise<void> | void
    afterStop?: () => Promise<void> | void
}

/**
 * 服务提供者接口
 */
export interface ServiceProvider {
    register(app: Application): void | Promise<void>
    boot?(app: Application): void | Promise<void>
    start?(app: Application): void | Promise<void>
    stop?(app: Application): void | Promise<void>
}

/**
 * 应用程序接口
 */
export interface Application {
    config: ConfigManager
    container: Container
    router: Router
    pipeline: Pipeline
    register(provider: ServiceProvider): void
    boot(): Promise<void>
    start(port?: number): Promise<void>
    stop(): Promise<void>
}

/**
 * 启动选项接口
 */
export interface BootstrapOptions {
    config?: ApplicationConfig
    configPath?: string
    providers?: Constructor<ServiceProvider>[]
    hooks?: LifecycleHooks
}

/**
 * 构造函数类型
 */
export type Constructor<T> = new (...args: any[]) => T
