/**
 * MacWindow 组件背景色样式
 * 提供预设的背景色选项，供 Astro 和 Vue 版本共同使用
 */

export type MacWindowBgType =
    | 'default'
    | 'light'
    | 'dark'
    | 'blue'
    | 'green'
    | 'purple'
    | 'orange'
    | 'red';

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
        description: '默认的浅色背景',
        bgClass: 'cosy:bg-base-100',
        headerBgClass: 'cosy:bg-base-200',
        statusBgClass: 'cosy:bg-base-200/95',
    },
    light: {
        type: 'light',
        name: '浅色',
        description: '明亮的浅色背景',
        bgClass: 'cosy:bg-white',
        headerBgClass: 'cosy:bg-gray-50',
        statusBgClass: 'cosy:bg-gray-50/95',
    },
    dark: {
        type: 'dark',
        name: '深色',
        description: '深色主题背景',
        bgClass: 'cosy:bg-gray-900',
        headerBgClass: 'cosy:bg-gray-800',
        statusBgClass: 'cosy:bg-gray-800/95',
    },
    blue: {
        type: 'blue',
        name: '蓝色',
        description: '蓝色主题背景',
        bgClass: 'cosy:bg-blue-50',
        headerBgClass: 'cosy:bg-blue-100',
        statusBgClass: 'cosy:bg-blue-100/95',
    },
    green: {
        type: 'green',
        name: '绿色',
        description: '绿色主题背景',
        bgClass: 'cosy:bg-green-50',
        headerBgClass: 'cosy:bg-green-100',
        statusBgClass: 'cosy:bg-green-100/95',
    },
    purple: {
        type: 'purple',
        name: '紫色',
        description: '紫色主题背景',
        bgClass: 'cosy:bg-purple-50',
        headerBgClass: 'cosy:bg-purple-100',
        statusBgClass: 'cosy:bg-purple-100/95',
    },
    orange: {
        type: 'orange',
        name: '橙色',
        description: '橙色主题背景',
        bgClass: 'cosy:bg-orange-50',
        headerBgClass: 'cosy:bg-orange-100',
        statusBgClass: 'cosy:bg-orange-100/95',
    },
    red: {
        type: 'red',
        name: '红色',
        description: '红色主题背景',
        bgClass: 'cosy:bg-red-50',
        headerBgClass: 'cosy:bg-red-100',
        statusBgClass: 'cosy:bg-red-100/95',
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
