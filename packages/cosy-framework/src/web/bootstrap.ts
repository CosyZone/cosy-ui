import { WebApplication } from './web-app.js'
import { BootstrapOptions } from '../types.js'
import { existsSync, readFileSync } from 'fs'
import { ApplicationFactory } from '../factory.js'

/**
 * 应用程序启动器类
 * 
 * 原理：
 * 1. 创建应用程序实例
 * 2. 加载并合并配置
 * 3. 注册服务提供者
 * 4. 执行启动流程
 * 
 * 工作流程：
 * 1. 实例化时接收启动选项
 * 2. start() 方法触发启动流程
 * 3. 按顺序执行各个启动步骤
 * 4. 返回配置好的应用程序实例
 */
export class Bootstrap {
    private app: WebApplication
    private options: BootstrapOptions

    /**
     * 创建启动器实例
     * 
     * @param options 启动选项
     */
    constructor(options: BootstrapOptions = {}) {
        this.options = options
        this.app = ApplicationFactory.create(options.config || {})
    }

    /**
     * 启动应用程序
     * 
     * 执行顺序：
     * 1. 设置生命周期钩子
     * 2. 加载配置文件
     * 3. 注册服务提供者
     * 4. 启动应用程序
     * 5. 启动 HTTP 服务器
     * 
     * @returns 启动完成的应用程序实例
     */
    async start(): Promise<WebApplication> {
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

        // 获取端口号
        const port = this.app.config.get('app.port', 3000)
        await this.app.start(port)

        return this.app
    }

    /**
     * 加载配置文件
     * 
     * 配置加载顺序：
     * 1. 加载默认配置 (app.json)
     * 2. 加载环境特定配置 (development.json, production.json 等)
     * 3. 配置会自动合并，环境配置优先级更高
     * 
     * 配置文件结构：
     * ```json
     * {
     *   "app": {
     *     "name": "My App",
     *     "port": 3000
     *   },
     *   "database": {
     *     "host": "localhost"
     *   }
     * }
     * ```
     */
    private async loadConfigFiles(): Promise<void> {
        console.log('[Cosy] 🔄 Bootstrap:loadConfigFiles...')
        const configPath = this.options.configPath || './config'

        // 尝试加载通用配置
        const appConfigPath = `${configPath}/app.json`
        if (existsSync(appConfigPath)) {
            const content = readFileSync(appConfigPath, 'utf-8')
            const config = JSON.parse(content)
            this.app.config.merge(config)
        }

        // 尝试加载环境特定配置
        const env = process.env.NODE_ENV || 'development'
        const envConfigPath = `${configPath}/${env}.json`
        if (existsSync(envConfigPath)) {
            const content = readFileSync(envConfigPath, 'utf-8')
            const config = JSON.parse(content)
            this.app.config.merge(config)
        }
    }

    /**
     * 注册服务提供者
     * 
     * 服务提供者的作用：
     * 1. 注册服务到容器
     * 2. 配置应用程序功能
     * 3. 提供启动和关闭钩子
     * 
     * 注册流程：
     * 1. 实例化每个提供者
     * 2. 调用提供者的 register 方法
     * 3. 保存提供者实例以便后续生命周期调用
     */
    private registerProviders(): void {
        if (this.options.providers) {
            for (const Provider of this.options.providers) {
                const provider = new Provider()
                this.app.register(provider)
            }
        }
    }

    /**
     * 创建启动器实例
     * 
     * 使用示例：
     * ```typescript
     * const bootstrap = Bootstrap.create({
     *   config: { port: 3000 },
     *   providers: [DatabaseProvider]
     * })
     * ```
     * 
     * @param options 启动选项
     * @returns 启动器实例
     */
    static create(options: BootstrapOptions = {}): Bootstrap {
        console.log('[Cosy] 🔄 Bootstrap:create...')
        return new Bootstrap(options)
    }

    /**
     * 快速启动应用程序
     * 
     * 使用示例：
     * ```typescript
     * const app = await Bootstrap.run({
     *   config: { port: 3000 }
     * })
     * ```
     * 
     * @param options 启动选项
     * @returns 启动完成的应用程序实例
     */
    static async run(options: BootstrapOptions = {}): Promise<WebApplication> {
        const bootstrap = new Bootstrap(options)
        return bootstrap.start()
    }
} 
