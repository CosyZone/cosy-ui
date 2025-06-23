import { ConfigValidator, ConfigRule, ConfigValidationResult } from '../types'

export class DefaultConfigValidator implements ConfigValidator {
    rules: Record<string, ConfigRule>

    constructor(rules: Record<string, ConfigRule> = {}) {
        this.rules = rules
    }

    validate(config: Record<string, any>): ConfigValidationResult {
        const errors: string[] = []
        const warnings: string[] = []

        // 验证必需字段
        for (const [key, rule] of Object.entries(this.rules)) {
            const value = this.getValue(config, key)

            // 检查必需字段
            if (rule.required && (value === undefined || value === null)) {
                errors.push(`Required config key '${key}' is missing`)
                continue
            }

            // 如果值不存在且有默认值，跳过验证
            if (value === undefined && rule.default !== undefined) {
                continue
            }

            // 类型验证
            if (value !== undefined && rule.type) {
                if (!this.validateType(value, rule.type)) {
                    errors.push(`Config key '${key}' must be of type ${rule.type}, got ${typeof value}`)
                    continue
                }
            }

            // 自定义验证器
            if (value !== undefined && rule.validator) {
                const result = rule.validator(value)
                if (typeof result === 'string') {
                    errors.push(`Config key '${key}': ${result}`)
                } else if (!result) {
                    errors.push(`Config key '${key}' failed validation`)
                }
            }
        }

        return {
            valid: errors.length === 0,
            errors,
            warnings
        }
    }

    private getValue(config: Record<string, any>, key: string): any {
        const keys = key.split('.')
        let value = config

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k]
            } else {
                return undefined
            }
        }

        return value
    }

    private validateType(value: any, type: string): boolean {
        switch (type) {
            case 'string':
                return typeof value === 'string'
            case 'number':
                return typeof value === 'number' && !isNaN(value)
            case 'boolean':
                return typeof value === 'boolean'
            case 'array':
                return Array.isArray(value)
            case 'object':
                return typeof value === 'object' && value !== null && !Array.isArray(value)
            default:
                return true
        }
    }
}

/**
 * 创建配置验证规则的辅助函数
 */
export function required(type?: string, validator?: (value: any) => boolean | string): ConfigRule {
    return {
        required: true,
        type: type as any,
        validator
    }
}

export function optional(type?: string, defaultValue?: any, validator?: (value: any) => boolean | string): ConfigRule {
    return {
        required: false,
        type: type as any,
        default: defaultValue,
        validator
    }
}

export function string(required = false, defaultValue?: string): ConfigRule {
    return {
        required,
        type: 'string',
        default: defaultValue
    }
}

export function number(required = false, defaultValue?: number, min?: number, max?: number): ConfigRule {
    const validator = (value: number) => {
        if (min !== undefined && value < min) {
            return `Value must be at least ${min}`
        }
        if (max !== undefined && value > max) {
            return `Value must be at most ${max}`
        }
        return true
    }

    return {
        required,
        type: 'number',
        default: defaultValue,
        validator: min !== undefined || max !== undefined ? validator : undefined
    }
}

export function boolean(required = false, defaultValue?: boolean): ConfigRule {
    return {
        required,
        type: 'boolean',
        default: defaultValue
    }
}

export function array(required = false, defaultValue?: any[]): ConfigRule {
    return {
        required,
        type: 'array',
        default: defaultValue
    }
}

export function object(required = false, defaultValue?: Record<string, any>): ConfigRule {
    return {
        required,
        type: 'object',
        default: defaultValue
    }
} 
