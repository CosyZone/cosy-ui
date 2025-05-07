export interface HeaderProps {
    /**
     * 当前语言代码
     */
    currentLocale?: string;

    /**
     * 侧边栏是否默认展开
     * @default false
     */
    defaultSidebarOpen?: boolean;

    /**
     * 导航栏高度
     * @default "md"
     */
    height?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

    /**
     * 语言选项列表
     */
    languages?: string[];

    /**
     * Logo图片元数据
     */
    logo?: ImageMetadata;

    /**
     * Logo 链接地址
     * @default "/"
     */
    logoHref?: string;

    /**
     * 导航菜单项
     */
    navItems?: NavItem[];

    /**
     * 是否显示侧边栏切换按钮
     * @default false
     */
    showSidebarToggle?: boolean;

    /**
     * 社交链接
     */
    socialLinks?: Array<{
        name: string;
        url: string;
        icon: any;
    }>;

    /**
     * 是否固定在顶部
     * @default true
     */
    sticky?: boolean;

    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

    paddingHorizontal?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    paddingVertical?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export type NavItem = { href: string; label: string; };
