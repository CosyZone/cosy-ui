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
     * 当前路径
     */
    currentPath: string;

    /**
     * 桌面端类名
     */
    class?: string;

    /**
     * 是否开启调试模式，显示边框
     * @default false
     */
    debug?: boolean;
}