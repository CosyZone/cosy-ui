/**
 * 配置源接口
 */
export interface IConfigSource {
    name: string
    load(): Promise<Record<string, any>>
    watch?(callback: (config: Record<string, any>) => void): void
}

/**
 * 配置规则接口
 */
export interface IConfigRule {
    key: string
    type: 'string' | 'number' | 'boolean' | 'array' | 'object'
    required?: boolean
    default?: any
    validate?: ((value: any) => boolean | string | undefined) | undefined
}

/**
 * 配置验证器接口
 */
export interface IConfigValidator {
    rules: IConfigRule[]
    validate(config: Record<string, any>): IConfigValidationResult
}

/**
 * 配置验证结果接口
 */
export interface IConfigValidationResult {
    valid: boolean
    errors: string[]
}

/**
 * 配置管理器接口
 */
export interface IConfigManager {
    get<T = any>(key: string, defaultValue?: T): T
    set(key: string, value: any): void
    has(key: string): boolean
    all(): Record<string, any>
    load(source: IConfigSource): Promise<void>
    merge(config: Record<string, any>): void
    setValidator(validator: IConfigValidator): void
    validate(): boolean
    getErrors(): string[]
    reload(): Promise<void>
    clear(): void
}

/**
 * 环境配置接口
 */
export interface IEnvironmentConfig {
    name?: string
    prefix?: string
    path?: string
    encoding?: string
    debug?: boolean
} 
