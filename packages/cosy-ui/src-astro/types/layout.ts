import type { IFooterProps } from './footer';
import type { IHeaderProps } from './header';
import type { IMainContentProps } from './main';
import type { IMetaProps } from './meta';
import type { ISidebarProps } from './sidebar';

export interface IAppLayoutProps {
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
    head?: any;

    /**
     * 自定义头部内容
     */
    headerConfig: IHeaderProps;

    /**
     * 侧边栏配置
     */
    sidebarConfig: ISidebarProps;

    /**
     * 主内容配置
     */
    mainContentConfig: IMainContentProps;

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
    metaConfig: IMetaProps;

    /**
     * 页脚相关配置
     */
    footerConfig: IFooterProps;
}
