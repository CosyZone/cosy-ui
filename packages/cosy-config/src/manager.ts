import {
    IConfigManager,
    IConfigSource,
    IConfigValidator,
    IConfigValidationResult
} from '@coffic/cosy-interfaces'

export class Configuration implements IConfigManager {
    private config: Record<string, any> = {}
    private sources: IConfigSource[] = []
    private validator?: IConfigValidator
    private errors: string[] = []

    /**
     * 获取配置值
     */
    get<T = any>(key: string, defaultValue?: T): T {
        const keys = key.split('.')
        let value: any = this.config

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k]
            } else {
                return defaultValue as T
            }
        }

        return value as T
    }

    /**
     * 设置配置值
     */
    set(key: string, value: any): void {
        const keys = key.split('.')
        let current: Record<string, any> = this.config

        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i]
            if (k && !(k in current)) {
                current[k] = {}
            }
            if (k) {
                current = current[k] as Record<string, any>
            }
        }

        const lastKey = keys[keys.length - 1]
        if (lastKey) {
            current[lastKey] = value
        }
    }

    /**
     * 检查配置键是否存在
     */
    has(key: string): boolean {
        return this.get(key) !== undefined
    }

    /**
     * 获取所有配置
     */
    all(): Record<string, any> {
        return { ...this.config }
    }

    /**
     * 加载配置源
     */
    async load(source: IConfigSource): Promise<void> {
        try {
            const config = await source.load()
            this.merge(config)
            this.sources.push(source)

            // 设置监听器（如果支持）
            if (source.watch) {
                source.watch((newConfig: Record<string, any>) => {
                    this.merge(newConfig)
                })
            }
        } catch (error) {
            this.errors.push(`Failed to load config from ${source.name}: ${(error as Error).message}`)
        }
    }

    /**
     * 合并配置
     */
    merge(config: Record<string, any>): void {
        this.mergeRecursive(this.config, config)
    }

    /**
     * 递归合并配置对象
     */
    private mergeRecursive(target: Record<string, any>, source: Record<string, any>): void {
        for (const [key, value] of Object.entries(source)) {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                if (!target[key] || typeof target[key] !== 'object') {
                    target[key] = {}
                }
                this.mergeRecursive(target[key], value)
            } else {
                target[key] = value
            }
        }
    }

    /**
     * 设置配置验证器
     */
    setValidator(validator: IConfigValidator): void {
        this.validator = validator
    }

    /**
     * 验证配置
     */
    validate(): boolean {
        if (!this.validator) {
            return true
        }

        const result = this.validator.validate(this.config)
        this.errors = result.errors
        return result.valid
    }

    /**
     * 获取错误信息
     */
    getErrors(): string[] {
        return [...this.errors]
    }

    /**
     * 重新加载所有配置源
     */
    async reload(): Promise<void> {
        this.config = {}
        const sources = [...this.sources]
        this.sources = []

        for (const source of sources) {
            await this.load(source)
        }
    }

    /**
     * 清除配置
     */
    clear(): void {
        this.config = {}
        this.sources = []
        this.errors = []
    }
} 
