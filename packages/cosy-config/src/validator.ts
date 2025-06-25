import { ConfigRule, ConfigValidator, ConfigValidationResult } from './types.js'

/**
 * 配置验证器实现
 */
export class Validator implements ConfigValidator {
    rules: ConfigRule[] = []

    constructor(rules: ConfigRule[] = []) {
        this.rules = rules
    }

    validate(config: Record<string, any>): ConfigValidationResult {
        const errors: string[] = []

        for (const rule of this.rules) {
            const value = this.getValue(config, rule.key)

            // 检查必填项
            if (rule.required && value === undefined) {
                errors.push(`${rule.key} is required`)
                continue
            }

            // 如果值不存在且不是必填项，跳过验证
            if (value === undefined) {
                continue
            }

            // 类型检查
            if (!this.checkType(value, rule.type)) {
                errors.push(`${rule.key} must be a ${rule.type}`)
                continue
            }

            // 自定义验证
            if (rule.validate) {
                const result = rule.validate(value)
                if (typeof result === 'string') {
                    errors.push(result)
                } else if (result === false) {
                    errors.push(`${rule.key} validation failed`)
                }
            }
        }

        return {
            valid: errors.length === 0,
            errors
        }
    }

    private getValue(config: Record<string, any>, key: string): any {
        const keys = key.split('.')
        let value: any = config

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k]
            } else {
                return undefined
            }
        }

        return value
    }

    private checkType(value: any, type: string): boolean {
        switch (type) {
            case 'string':
                return typeof value === 'string'
            case 'number':
                return typeof value === 'number'
            case 'boolean':
                return typeof value === 'boolean'
            case 'array':
                return Array.isArray(value)
            case 'object':
                return typeof value === 'object' && !Array.isArray(value)
            default:
                return false
        }
    }
}

/**
 * 创建必填规则
 */
export function required(key: string, type: string, validator?: (value: any) => boolean | string): ConfigRule {
    return {
        key,
        required: true,
        type: type as any,
        validate: validator
    }
}

/**
 * 创建可选规则
 */
export function optional(key: string, type?: string, defaultValue?: any, validator?: (value: any) => boolean | string): ConfigRule {
    return {
        key,
        required: false,
        type: type as any,
        default: defaultValue,
        validate: validator
    }
}

/**
 * 创建字符串规则
 */
export function string(key: string, required = false, defaultValue?: string): ConfigRule {
    return {
        key,
        required,
        type: 'string',
        default: defaultValue
    }
}

/**
 * 创建数字规则
 */
export function number(key: string, required = false, defaultValue?: number): ConfigRule {
    return {
        key,
        required,
        type: 'number',
        default: defaultValue
    }
}

/**
 * 创建布尔规则
 */
export function boolean(key: string, required = false, defaultValue?: boolean): ConfigRule {
    return {
        key,
        required,
        type: 'boolean',
        default: defaultValue
    }
}

/**
 * 创建数组规则
 */
export function array(key: string, required = false, defaultValue?: any[]): ConfigRule {
    return {
        key,
        required,
        type: 'array',
        default: defaultValue
    }
}

/**
 * 创建对象规则
 */
export function object(key: string, required = false, defaultValue?: Record<string, any>): ConfigRule {
    return {
        key,
        required,
        type: 'object',
        default: defaultValue
    }
} 
