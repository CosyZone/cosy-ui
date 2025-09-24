import type { IFooterProps } from '../footer/types';
import type { IHeaderProps } from '../types/header';
import type { IMainContentProps } from '../main/types';
import type { IMetaProps } from '../../src/common/meta';
import type { ISidebarProps } from '../../src/common/sidebar';
import type { ThemeId } from '../../src/common/themes';

export interface IAppLayoutProps {
    /**
     * 类名列表
     */
    'class:list'?: any;

    /**
     * 页面类名
     */
    class?: string;

    /**
     * 是否只渲染 body 部分，用于文档展示等场景
     * @default false
     */
    bodyOnly?: boolean;

    /**
     * 主题设置
     * @default 'default'
     */
    theme?: ThemeId;

    /**
     * 页脚相关配置
     */
    footerConfig: IFooterProps;

    /**
     * 自定义头部内容
     */
    head?: any;

    /**
     * 自定义头部内容
     */
    headerConfig: IHeaderProps;

    /**
     * 加载中界面延迟显示的时间
     */
    loadingDelay?: number;

    /**
     * 主内容配置
     */
    mainContentConfig: IMainContentProps;

    /**
     * 元数据配置
     */
    metaConfig: IMetaProps;

    /**
     * 是否显示页脚
     * @default true
     */
    showFooter?: boolean;

    /**
     * 是否显示页眉
     * @default true
     */
    showHeader?: boolean;

    /**
     * 是否显示侧边栏
     * @default true
     */
    showSidebar?: boolean;

    /**
     * 侧边栏配置
     */
    sidebarConfig: ISidebarProps;
}
