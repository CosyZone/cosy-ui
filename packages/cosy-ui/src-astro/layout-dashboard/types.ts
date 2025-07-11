/**
 * 仪表盘组件的共享类型定义
 */

export interface NavItem {
    href: string;
    icon?: string;  // 现在是可选的，会根据 href 自动推断
    text: string;
    badge?: string | number;
    items?: NavItem[];
}

/**
 * 用户菜单项接口
 */
export interface UserMenuItem {
    href: string;
    text: string;
    icon?: string;
}

/**
 * 侧边栏尺寸类型
 */
export type SidebarSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * 侧边栏尺寸配置映射
 */
export const sidebarSizeMap: Record<SidebarSize, string> = {
    'sm': 'cosy:w-48',   // 12rem (192px)
    'md': 'cosy:w-64',   // 16rem (256px) - 默认
    'lg': 'cosy:w-72',   // 18rem (288px)
    'xl': 'cosy:w-80',   // 20rem (320px)
};

/**
 * 获取侧边栏宽度样式类
 * @param size 侧边栏尺寸
 * @returns 对应的 CSS 类名
 */
export function getSidebarWidth(size: SidebarSize = 'md'): string {
    return sidebarSizeMap[size];
}

/**
 * 侧边栏背景色主题类型
 */
export type SidebarTheme = 'default' | 'dark' | 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';

/**
 * 侧边栏背景色主题配置映射
 */
export const sidebarThemeMap: Record<SidebarTheme, { bg: string; headerBg: string; textColor: string; borderColor: string }> = {
    'default': {
        bg: 'cosy:bg-base-300',
        headerBg: 'cosy:bg-base-300',
        textColor: 'cosy:text-base-content',
        borderColor: 'cosy:border-base-200'
    },
    'dark': {
        bg: 'cosy:bg-base-100',
        headerBg: 'cosy:bg-base-100',
        textColor: 'cosy:text-base-content',
        borderColor: 'cosy:border-base-200'
    },
    'neutral': {
        bg: 'cosy:bg-neutral',
        headerBg: 'cosy:bg-neutral',
        textColor: 'cosy:text-neutral-content',
        borderColor: 'cosy:border-neutral-focus'
    },
    'primary': {
        bg: 'cosy:bg-primary',
        headerBg: 'cosy:bg-primary',
        textColor: 'cosy:text-primary-content',
        borderColor: 'cosy:border-primary-focus'
    },
    'secondary': {
        bg: 'cosy:bg-secondary',
        headerBg: 'cosy:bg-secondary',
        textColor: 'cosy:text-secondary-content',
        borderColor: 'cosy:border-secondary-focus'
    },
    'accent': {
        bg: 'cosy:bg-accent',
        headerBg: 'cosy:bg-accent',
        textColor: 'cosy:text-accent-content',
        borderColor: 'cosy:border-accent-focus'
    },
    'info': {
        bg: 'cosy:bg-info',
        headerBg: 'cosy:bg-info',
        textColor: 'cosy:text-info-content',
        borderColor: 'cosy:border-info-focus'
    },
    'success': {
        bg: 'cosy:bg-success',
        headerBg: 'cosy:bg-success',
        textColor: 'cosy:text-success-content',
        borderColor: 'cosy:border-success-focus'
    },
    'warning': {
        bg: 'cosy:bg-warning',
        headerBg: 'cosy:bg-warning',
        textColor: 'cosy:text-warning-content',
        borderColor: 'cosy:border-warning-focus'
    },
    'error': {
        bg: 'cosy:bg-error',
        headerBg: 'cosy:bg-error',
        textColor: 'cosy:text-error-content',
        borderColor: 'cosy:border-error-focus'
    }
};

/**
 * 获取侧边栏主题样式类
 * @param theme 侧边栏主题
 * @returns 对应的样式配置
 */
export function getSidebarTheme(theme: SidebarTheme = 'default') {
    return sidebarThemeMap[theme];
}

/**
 * 主内容区域背景主题类型
 */
export type MainBackgroundTheme = 'transparent' | 'base-100' | 'base-200' | 'base-300' | 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'gradient-warm' | 'gradient-cool' | 'gradient-rainbow' | 'gradient-sunset' | 'gradient-ocean' | 'gradient-forest';



/**
 * 主内容区域背景主题配置映射
 */
export const mainBackgroundThemeMap: Record<MainBackgroundTheme, string> = {
    'transparent': '',
    'base-100': 'cosy:bg-base-100',
    'base-200': 'cosy:bg-base-200',
    'base-300': 'cosy:bg-base-300',
    'neutral': 'cosy:bg-neutral',
    'primary': 'cosy:bg-primary',
    'secondary': 'cosy:bg-secondary',
    'accent': 'cosy:bg-accent',
    'info': 'cosy:bg-info',
    'success': 'cosy:bg-success',
    'warning': 'cosy:bg-warning',
    'error': 'cosy:bg-error',
    'gradient-warm': 'cosy:bg-gradient-to-br cosy:from-orange-100 cosy:via-red-50 cosy:to-pink-100',
    'gradient-cool': 'cosy:bg-gradient-to-br cosy:from-blue-100 cosy:via-cyan-50 cosy:to-green-100',
    'gradient-rainbow': 'cosy:bg-gradient-to-br cosy:from-purple-100 cosy:via-pink-50 cosy:to-blue-100',
    'gradient-sunset': 'cosy:bg-gradient-to-br cosy:from-yellow-100 cosy:via-orange-50 cosy:to-red-100',
    'gradient-ocean': 'cosy:bg-gradient-to-br cosy:from-blue-100 cosy:via-teal-50 cosy:to-cyan-100',
    'gradient-forest': 'cosy:bg-gradient-to-br cosy:from-green-100 cosy:via-emerald-50 cosy:to-teal-100'
};

/**
 * 获取主内容区域背景主题样式类
 * @param theme 主内容区域背景主题
 * @returns 对应的样式类名
 */
export function getMainBackgroundTheme(theme: MainBackgroundTheme = 'base-100'): string {
    return mainBackgroundThemeMap[theme];
}

export { getIconFromHref, getNavItemIcon, getUserMenuItemIcon } from './tools'; 
