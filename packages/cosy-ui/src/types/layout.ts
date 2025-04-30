import type { FooterProps } from "./footer";
import type { HeaderProps } from "./header";
import type { MainContentProps } from "./main";
import type { MetaProps } from "./meta";
import type { SidebarProps } from "./sidebar";

export interface AppLayoutProps {
    /**
     * 是否显示侧边栏
     * @default true
     */
    showSidebar?: boolean;

    /**
     * 是否显示页眉
     * @default true
     */
    showHeader?: boolean;

    /**
     * 是否显示页脚
     * @default true
     */
    showFooter?: boolean;

    /**
     * 自定义头部内容
     */
    head?: astroHTML.JSX.Element;

    /**
     * 自定义头部内容
     */
    headerConfig: HeaderProps;

    /**
     * 侧边栏配置
     */
    sidebarConfig: SidebarProps;

    /**
     * 主内容配置
     */
    mainContentConfig: MainContentProps;

    /**
     * 页面类名
     */
    class?: string;

    /**
     * 类名列表
     */
    'class:list'?: any;

    /**
     * 调试模式，显示各个部分的边框
     * @default false
     */
    debug?: boolean;

    /**
     * 元数据配置
     */
    metaConfig: MetaProps;

    /**
     * 当前语言
     */
    currentLocale?: string;

    /**
     * 页脚相关配置
     */
    footerConfig: FooterProps;
}