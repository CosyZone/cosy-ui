/**
 * MacWindow 组件背景色样式
 * 提供预设的背景色选项，供 Astro 和 Vue 版本共同使用
 */

export type MacWindowBgType =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';

export interface MacWindowBgConfig {
    type: MacWindowBgType;
    name: string;
    description: string;
    bgClass: string;
    headerBgClass: string;
    statusBgClass: string;
}

export const MAC_WINDOW_BG_CONFIGS: Record<MacWindowBgType, MacWindowBgConfig> = {
    default: {
        type: 'default',
        name: '默认',
        description: '默认背景，自动适配明暗主题',
        bgClass: 'cosy:bg-base-100',
        headerBgClass: 'cosy:bg-base-200',
        statusBgClass: 'cosy:bg-base-200/95',
    },
    primary: {
        type: 'primary',
        name: '主要',
        description: '主要主题背景',
        bgClass: 'cosy:bg-primary/10',
        headerBgClass: 'cosy:bg-base-200',
        statusBgClass: 'cosy:bg-primary/15',
    },
    secondary: {
        type: 'secondary',
        name: '次要',
        description: '次要主题背景',
        bgClass: 'cosy:bg-secondary/10',
        headerBgClass: 'cosy:bg-base-200',
        statusBgClass: 'cosy:bg-secondary/15',
    },
    accent: {
        type: 'accent',
        name: '强调',
        description: '强调主题背景',
        bgClass: 'cosy:bg-accent/10',
        headerBgClass: 'cosy:bg-base-200',
        statusBgClass: 'cosy:bg-accent/15',
    },
    neutral: {
        type: 'neutral',
        name: '中性',
        description: '中性主题背景',
        bgClass: 'cosy:bg-neutral/10',
        headerBgClass: 'cosy:bg-base-200',
        statusBgClass: 'cosy:bg-neutral/15',
    },
    info: {
        type: 'info',
        name: '信息',
        description: '信息主题背景',
        bgClass: 'cosy:bg-info/10',
        headerBgClass: 'cosy:bg-base-200',
        statusBgClass: 'cosy:bg-info/15',
    },
    success: {
        type: 'success',
        name: '成功',
        description: '成功主题背景',
        bgClass: 'cosy:bg-success/10',
        headerBgClass: 'cosy:bg-base-200',
        statusBgClass: 'cosy:bg-success/15',
    },
    warning: {
        type: 'warning',
        name: '警告',
        description: '警告主题背景',
        bgClass: 'cosy:bg-warning/10',
        headerBgClass: 'cosy:bg-base-200',
        statusBgClass: 'cosy:bg-warning/15',
    },
    error: {
        type: 'error',
        name: '错误',
        description: '错误主题背景',
        bgClass: 'cosy:bg-error/10',
        headerBgClass: 'cosy:bg-base-200',
        statusBgClass: 'cosy:bg-error/15',
    },
};

/**
 * 获取背景色配置
 * @param type 背景色类型
 * @returns 背景色配置对象
 */
export function getMacWindowBgConfig(type: MacWindowBgType = 'default'): MacWindowBgConfig {
    return MAC_WINDOW_BG_CONFIGS[type] || MAC_WINDOW_BG_CONFIGS.default;
}

/**
 * 获取所有背景色选项
 * @returns 背景色配置数组
 */
export function getAllMacWindowBgConfigs(): MacWindowBgConfig[] {
    return Object.values(MAC_WINDOW_BG_CONFIGS);
} 
