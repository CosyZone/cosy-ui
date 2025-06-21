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
 * 基于 href 关键词匹配图标名称的映射表
 */
const hrefToIconMap: Record<string, string> = {
    // 主页相关
    'dashboard': 'dashboard',
    'home': 'home',
    'index': 'home',

    // 用户相关
    'user': 'user',
    'users': 'users',
    'profile': 'user',
    'account': 'user',
    'member': 'users',
    'team': 'users',

    // 设置相关
    'setting': 'settings',
    'config': 'settings',
    'preference': 'settings',
    'admin': 'settings',
    'manage': 'settings',
    'tool': 'tools',

    // 数据相关
    'chart': 'chart',
    'analytics': 'chart',
    'report': 'report',
    'statistic': 'chart',
    'data': 'chart',

    // 文档相关
    'doc': 'document',
    'document': 'document',
    'file': 'document',
    'page': 'document',
    'article': 'document',
    'content': 'document',

    // 日历和时间
    'calendar': 'calendar',
    'schedule': 'calendar',
    'event': 'calendar',
    'date': 'calendar',

    // 通知和消息
    'notification': 'notification',
    'message': 'message',
    'chat': 'message',
    'mail': 'mail',
    'email': 'mail',
    'inbox': 'inboxArchive',

    // 搜索
    'search': 'search',
    'find': 'search',

    // 收藏和标记
    'favorite': 'star',
    'bookmark': 'star',
    'star': 'star',
    'like': 'heart',

    // 文件夹和目录
    'folder': 'folder',
    'directory': 'folder',
    'category': 'folder',

    // 安全和权限
    'security': 'security',
    'permission': 'security',
    'auth': 'security',
    'login': 'security',

    // 财务相关
    'payment': 'wallet',
    'billing': 'wallet',
    'finance': 'wallet',
    'money': 'wallet',
    'wallet': 'wallet',

    // 操作相关
    'edit': 'edit',
    'delete': 'delete',
    'remove': 'delete',
    'save': 'save',
    'download': 'download',
    'upload': 'upload',
    'refresh': 'refresh',

    // 工具和实用程序
    'clipboard': 'clipboard',
    'link': 'link',
    'menu': 'menu',
    'close': 'close',
    'check': 'check',
};

/**
 * 根据 href 自动推断图标名称
 * @param href 链接地址
 * @param fallbackIcon 如果匹配失败时使用的默认图标
 * @returns 图标名称
 */
export function getIconFromHref(href: string, fallbackIcon: string = 'folder'): string {
    // 将 href 转换为小写并移除路径分隔符
    const normalizedHref = href.toLowerCase().replace(/[\/\-_]/g, '');

    // 遍历映射表，找到匹配的关键词
    for (const [keyword, iconName] of Object.entries(hrefToIconMap)) {
        if (normalizedHref.includes(keyword)) {
            return iconName;
        }
    }

    return fallbackIcon;
}

/**
 * 根据 NavItem 获取完整的图标信息
 * @param item 导航项
 * @returns 图标名称
 */
export function getNavItemIcon(item: NavItem): string {
    // 如果显式指定了图标，优先使用
    if (item.icon) {
        return item.icon;
    }

    // 否则根据 href 自动推断
    return getIconFromHref(item.href);
} 