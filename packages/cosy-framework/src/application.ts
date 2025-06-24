/**
 * 应用程序核心模块
 * 
 * 本模块实现了框架的核心应用程序类，提供：
 * 1. 应用程序生命周期管理（启动、运行、停止）
 * 2. HTTP 服务器集成（基于 Fastify）
 * 3. 服务容器集成（依赖注入）
 * 4. 路由系统（RESTful API）
 * 5. 中间件系统（请求处理管道）
 * 6. 配置管理（环境配置）
 */

import {
    Application as ApplicationInterface,
    ApplicationConfig,
    LifecycleHooks as ApplicationLifecycleHooks,
    ServiceProvider,
    Constructor
} from './types'

import { ConfigManager } from '@coffic/cosy-config'
import { Container } from '@coffic/cosy-container'
import { Pipeline } from '@coffic/cosy-middleware'
import { Router } from '@coffic/cosy-router'

/**
 * 应用程序类
 * 
 * 核心功能：
 * 1. 配置管理
 * 2. 服务容器
 * 3. 中间件管理
 * 4. 路由管理
 * 5. 生命周期管理
 */
export class Application implements ApplicationInterface {
    public config: ConfigManager
    public container: Container
    public router: Router
    public pipeline: Pipeline

    private hooks: ApplicationLifecycleHooks = {}
    private booted: boolean = false
    private started: boolean = false
    private providers: ServiceProvider[] = []

    /**
     * 创建应用程序实例
     * @param config 应用程序配置
     */
    constructor(config: ApplicationConfig = {}) {
        // @ts-ignore
        this.config = new ConfigManager()
        this.config.merge(config)
        // @ts-ignore
        this.container = new Container()
        // @ts-ignore
        this.router = new Router()
        // @ts-ignore
        this.pipeline = new Pipeline()

        // 注册核心服务
        this.registerCoreServices()
    }

    /**
     * 注册核心服务
     */
    private registerCoreServices(): void {
        // @ts-ignore
        this.container.bind('app', this)
        // @ts-ignore
        this.container.bind('config', this.config)
        // @ts-ignore
        this.container.bind('router', this.router)
    }

    /**
     * 设置生命周期钩子
     * @param hooks 生命周期钩子
     */
    setHooks(hooks: ApplicationLifecycleHooks): void {
        this.hooks = hooks
    }

    /**
     * 注册服务提供者
     * @param provider 服务提供者
     */
    register(provider: ServiceProvider): void {
        this.providers.push(provider)
        provider.register(this)
    }

    /**
     * 启动应用程序
     */
    async boot(): Promise<void> {
        if (this.booted) {
            return
        }

        // 执行启动前钩子
        if (this.hooks.beforeBoot) {
            await this.hooks.beforeBoot()
        }

        // 启动服务提供者
        for (const provider of this.providers) {
            if (provider.boot) {
                await provider.boot(this)
            }
        }

        this.booted = true

        // 执行启动后钩子
        if (this.hooks.afterBoot) {
            await this.hooks.afterBoot()
        }
    }

    /**
     * 启动 HTTP 服务器
     * @param port 端口号
     */
    async start(port: number = 3000): Promise<void> {
        if (!this.booted) {
            await this.boot()
        }

        if (this.started) {
            return
        }

        // 执行启动前钩子
        if (this.hooks.beforeStart) {
            await this.hooks.beforeStart()
        }

        // 启动服务提供者
        for (const provider of this.providers) {
            if (provider.start) {
                await provider.start(this)
            }
        }

        this.started = true

        // 执行启动后钩子
        if (this.hooks.afterStart) {
            await this.hooks.afterStart()
        }
    }

    /**
     * 停止应用程序
     */
    async stop(): Promise<void> {
        if (!this.started) {
            return
        }

        // 执行停止前钩子
        if (this.hooks.beforeStop) {
            await this.hooks.beforeStop()
        }

        // 停止服务提供者
        for (const provider of this.providers) {
            if (provider.stop) {
                await provider.stop(this)
            }
        }

        this.started = false

        // 执行停止后钩子
        if (this.hooks.afterStop) {
            await this.hooks.afterStop()
        }
    }
} 
