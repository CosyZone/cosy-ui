import { Application } from './index'
import { BootstrapOptions, ApplicationConfig } from '../types'
import { Environment, JsonFileSource } from '../config'
import { existsSync } from 'fs'

export class Bootstrap {
    private app: Application
    private options: BootstrapOptions

    constructor(options: BootstrapOptions = {}) {
        this.options = options
        this.app = new Application(options.config)
    }

    /**
     * 启动应用程序
     */
    async start(): Promise<Application> {
        console.log('[Cosy] 🔄 Bootstrap:start...')
        // 设置生命周期钩子
        if (this.options.hooks) {
            this.app.setHooks(this.options.hooks)
        }

        // 加载配置文件
        await this.loadConfigFiles()

        // 注册服务提供者
        this.registerProviders()

        // 启动应用
        await this.app.boot()

        const port = this.app.config('app.port')
        await this.app.start(port)

        return this.app
    }

    /**
     * 加载配置文件
     */
    private async loadConfigFiles(): Promise<void> {
        console.log('[Cosy] 🔄 Bootstrap:loadConfigFiles...')
        const configPath = this.options.configPath || './config'

        // 尝试加载通用配置
        const appConfigPath = `${configPath}/app.json`
        if (existsSync(appConfigPath)) {
            const configSource = new JsonFileSource(appConfigPath)
            await this.app.getConfig().load(configSource)
        }

        // 尝试加载环境特定配置
        const envConfigPath = `${configPath}/${Environment.getCurrent()}.json`
        if (existsSync(envConfigPath)) {
            const envConfigSource = new JsonFileSource(envConfigPath)
            await this.app.getConfig().load(envConfigSource)
        }
    }

    /**
     * 注册服务提供者
     */
    private registerProviders(): void {
        if (this.options.providers) {
            for (const ProviderClass of this.options.providers) {
                const provider = new ProviderClass()
                this.app.register(provider)
            }
        }
    }

    /**
     * 创建启动器
     */
    static create(options: BootstrapOptions = {}): Bootstrap {
        console.log('[Cosy] 🔄 Bootstrap:create...')
        return new Bootstrap(options)
    }

    /**
     * 快速启动
     */
    static async run(options: BootstrapOptions = {}): Promise<Application> {
        const bootstrap = new Bootstrap(options)
        return bootstrap.start()
    }
} 
