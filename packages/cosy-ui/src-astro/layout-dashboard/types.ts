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
 * 内容区域背景色主题类型
 */
export type ContentTheme = 'card' | 'transparent' | 'base' | 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';

/**
 * 内容区域背景色主题配置映射
 */
export const contentThemeMap: Record<ContentTheme, { container: string; shadow: string }> = {
    'card': {
        container: 'cosy:card cosy:bg-base-100',
        shadow: 'cosy:shadow-sm'
    },
    'transparent': {
        container: '',
        shadow: ''
    },
    'base': {
        container: 'cosy:card cosy:bg-base-200',
        shadow: 'cosy:shadow-sm'
    },
    'neutral': {
        container: 'cosy:card cosy:bg-neutral',
        shadow: 'cosy:shadow-sm'
    },
    'primary': {
        container: 'cosy:card cosy:bg-primary cosy:text-primary-content',
        shadow: 'cosy:shadow-sm'
    },
    'secondary': {
        container: 'cosy:card cosy:bg-secondary cosy:text-secondary-content',
        shadow: 'cosy:shadow-sm'
    },
    'accent': {
        container: 'cosy:card cosy:bg-accent cosy:text-accent-content',
        shadow: 'cosy:shadow-sm'
    },
    'info': {
        container: 'cosy:card cosy:bg-info cosy:text-info-content',
        shadow: 'cosy:shadow-sm'
    },
    'success': {
        container: 'cosy:card cosy:bg-success cosy:text-success-content',
        shadow: 'cosy:shadow-sm'
    },
    'warning': {
        container: 'cosy:card cosy:bg-warning cosy:text-warning-content',
        shadow: 'cosy:shadow-sm'
    },
    'error': {
        container: 'cosy:card cosy:bg-error cosy:text-error-content',
        shadow: 'cosy:shadow-sm'
    }
};

/**
 * 获取内容区域主题样式类
 * @param theme 内容主题
 * @returns 对应的样式配置
 */
export function getContentTheme(theme: ContentTheme = 'card') {
    return contentThemeMap[theme];
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