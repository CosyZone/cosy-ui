// 占位符常量
export const CONFIG_TEMP = 'temp';

/**
 * 配置源类型枚举
 */
export enum ConfigSourceType {
    /**
     * 文件配置源
     */
    FILE = 'file',

    /**
     * 环境变量配置源
     */
    ENV = 'env',

    /**
     * 远程配置源
     */
    REMOTE = 'remote',

    /**
     * 内存配置源
     */
    MEMORY = 'memory'
}

/**
 * 配置优先级常量
 */
export const CONFIG_PRIORITIES = {
    /**
     * 默认优先级
     */
    DEFAULT: 0,

    /**
     * 文件配置优先级
     */
    FILE: 100,

    /**
     * 环境变量优先级
     */
    ENV: 200,

    /**
     * 远程配置优先级
     */
    REMOTE: 300,

    /**
     * 内存配置优先级
     */
    MEMORY: 400
} as const;
