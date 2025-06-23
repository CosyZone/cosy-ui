import { ConfigChangeCallback, IValidationRule, IValidationResult, IValidationError } from './types';

/**
 * 配置管理器接口
 */
export interface IConfigManager {
    /**
     * 配置加载
     */
    load(source: IConfigSource): Promise<void>;
    loadSync(source: IConfigSource): void;
    reload(): Promise<void>;

    /**
     * 配置访问
     */
    get<T>(key: string, defaultValue?: T): T;
    has(key: string): boolean;
    set(key: string, value: any): void;

    /**
     * 配置管理
     */
    merge(config: Record<string, any>): void;
    clear(): void;

    /**
     * 配置监听
     */
    onChange(callback: ConfigChangeCallback): void;
    offChange(callback: ConfigChangeCallback): void;
}

/**
 * 配置源接口
 */
export interface IConfigSource {
    /**
     * 配置加载
     */
    load(): Promise<Record<string, any>>;
    loadSync(): Record<string, any>;

    /**
     * 源信息
     */
    getName(): string;
    getPriority(): number;
    isReloadable(): boolean;

    /**
     * 重载支持
     */
    watch?(): void;
    unwatch?(): void;
}

/**
 * 配置验证器接口
 */
export interface IConfigValidator {
    /**
     * 验证方法
     */
    validate(config: Record<string, any>): IValidationResult;
    validateKey(key: string, value: any): IValidationResult;

    /**
     * 规则管理
     */
    addRule(key: string, rule: IValidationRule): this;
    removeRule(key: string): boolean;

    /**
     * 错误处理
     */
    getErrors(): IValidationError[];
}

// 占位符接口
export interface IConfigTemp { }
