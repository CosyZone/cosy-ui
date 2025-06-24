/**
 * 配置源接口
 */
export interface ConfigSource {
    name: string
    load(): Promise<Record<string, any>>
    watch?(callback: (config: Record<string, any>) => void): void
}

/**
 * 配置规则接口
 */
export interface ConfigRule {
    key: string
    type: 'string' | 'number' | 'boolean' | 'array' | 'object'
    required?: boolean
    default?: any
    validate?: ((value: any) => boolean | string | undefined) | undefined
}

/**
 * 配置验证器接口
 */
export interface ConfigValidator {
    rules: ConfigRule[]
    validate(config: Record<string, any>): ConfigValidationResult
}

/**
 * 配置验证结果接口
 */
export interface ConfigValidationResult {
    valid: boolean
    errors: string[]
}

/**
 * 配置管理器接口
 */
export interface ConfigManager {
    get<T = any>(key: string, defaultValue?: T): T
    set(key: string, value: any): void
    has(key: string): boolean
    all(): Record<string, any>
    load(source: ConfigSource): Promise<void>
    merge(config: Record<string, any>): void
    setValidator(validator: ConfigValidator): void
    validate(): boolean
    getErrors(): string[]
    reload(): Promise<void>
    clear(): void
}

/**
 * 环境配置接口
 */
export interface EnvironmentConfig {
    name?: string
    prefix?: string
    path?: string
    encoding?: string
    debug?: boolean
} 
