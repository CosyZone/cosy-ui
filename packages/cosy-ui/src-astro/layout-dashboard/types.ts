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
export function getMainBackgroundTheme(theme: MainBackgroundTheme = 'transparent'): string {
    return mainBackgroundThemeMap[theme];
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
    'logout': 'logout',
    'signin': 'login',
    'signout': 'logout',
    'exit': 'logout',

    // 工具和实用程序
    'clipboard': 'clipboard',
    'link': 'link',
    'menu': 'menu',
    'close': 'close',
    'check': 'check',
    'help': 'help',
    'support': 'help',
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

/**
 * 根据 UserMenuItem 获取完整的图标信息
 * @param item 用户菜单项
 * @returns 图标名称
 */
export function getUserMenuItemIcon(item: UserMenuItem): string {
    // 如果显式指定了图标，优先使用
    if (item.icon) {
        return item.icon;
    }

    // 否则根据 href 自动推断，用户菜单默认图标为 'user'
    return getIconFromHref(item.href, 'user');
} 