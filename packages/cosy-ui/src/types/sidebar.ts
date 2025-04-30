export interface SidebarItem {
    href: string;
    text: string;
    items?: SidebarItem[];
}

export interface SidebarSection {
    title: string;
    items: SidebarItem[];
}

export interface SidebarProps {
    /**
     * 侧边栏项目
     */
    sidebarItems: SidebarSection[];

    /**
     * 桌面端类名
     */
    class?: string;

    /**
     * 是否开启调试模式，显示边框
     * @default false
     */
    debug?: boolean;

    /**
     * 侧边栏顶部外边距
     */
    marginTop?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | string;

    /**
     * 侧边栏底部外边距
     */
    marginBottom?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | string;
}
