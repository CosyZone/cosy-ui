/**
 * 配置变更回调函数类型
 */
export type ConfigChangeCallback = (key: string, newValue: any, oldValue: any) => void;

/**
 * 验证规则接口
 */
export interface IValidationRule {
    /**
     * 值类型
     */
    type?: string;

    /**
     * 是否必需
     */
    required?: boolean;

    /**
     * 匹配模式
     */
    pattern?: RegExp;

    /**
     * 自定义验证函数
     */
    validate?(value: any): boolean | Promise<boolean>;

    /**
     * 错误消息
     */
    message?: string;
}

/**
 * 验证结果接口
 */
export interface IValidationResult {
    /**
     * 是否有效
     */
    valid: boolean;

    /**
     * 错误列表
     */
    errors: IValidationError[];
}

/**
 * 验证错误接口
 */
export interface IValidationError {
    /**
     * 配置键
     */
    key: string;

    /**
     * 配置值
     */
    value: any;

    /**
     * 违反的规则
     */
    rule: string;

    /**
     * 错误消息
     */
    message: string;
}

// 配置模块占位符类型
export type TConfigTemp = string;
