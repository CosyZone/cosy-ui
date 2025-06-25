import { EnvironmentConfig } from './types.js'

export class Environment {
    private static current: string = process.env.NODE_ENV || 'development'
    private static configs = new Map<string, EnvironmentConfig>()

    /**
     * 设置当前环境
     */
    static setCurrent(environment: string): void {
        this.current = environment
    }

    /**
     * 获取当前环境
     */
    static getCurrent(): string {
        return this.current
    }

    /**
     * 注册环境配置
     */
    static register(name: string, config: EnvironmentConfig): void {
        this.configs.set(name, { ...config, name })
    }

    /**
     * 获取环境配置
     */
    static getConfig(environment?: string): EnvironmentConfig | undefined {
        const env = environment || this.current
        return this.configs.get(env)
    }

    /**
     * 检查是否为指定环境
     */
    static is(environment: string): boolean {
        return this.current === environment
    }

    /**
     * 检查是否为开发环境
     */
    static isDevelopment(): boolean {
        return this.is('development')
    }

    /**
     * 检查是否为生产环境
     */
    static isProduction(): boolean {
        return this.is('production')
    }

    /**
     * 检查是否为测试环境
     */
    static isTesting(): boolean {
        return this.is('test') || this.is('testing')
    }

    /**
     * 检查是否为调试模式
     */
    static isDebug(): boolean {
        const config = this.getConfig()
        return config?.debug ?? this.isDevelopment()
    }

    /**
     * 获取所有注册的环境
     */
    static getEnvironments(): string[] {
        return Array.from(this.configs.keys())
    }

    /**
     * 初始化默认环境
     */
    static initDefaults(): void {
        this.register('development', {
            name: 'development',
            debug: true
        })

        this.register('production', {
            name: 'production',
            debug: false
        })

        this.register('test', {
            name: 'test',
            debug: false
        })
    }
}

// 自动初始化默认环境
Environment.initDefaults() 
