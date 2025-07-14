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

export { getIconFromHref, getNavItemIcon, getUserMenuItemIcon } from './tools'; 
