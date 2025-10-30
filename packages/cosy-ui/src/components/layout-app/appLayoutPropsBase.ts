import type { BackgroundColor } from "../../../src/common/backgrounds";
import type { IMetaProps } from "../../../src/common/meta";
import type { ISidebarProps } from "../../../src/common/sidebar";
import type { ThemeId } from "../../../src/common/themes";
import type { IFooterProps } from "../footer/types";
import type { IHeaderProps } from "../header/types";
import type { IMainContentProps } from "../main/types";

/**
 * AppLayout 组件的基础属性接口（与框架无关）
 */
export interface IAppLayoutPropsBase {
	/**
	 * 类名列表
	 */
	"class:list"?: any;

	/**
	 * 页面类名
	 */
	class?: string;

	/**
	 * 背景类型，支持 Container 组件的所有背景选项
	 * 如：base-100、primary、secondary、accent、gradient-glow 等
	 * @default undefined
	 */
	background?: BackgroundColor;

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
	 * 当 showFooter=false 时可以不提供
	 */
	footerConfig?: IFooterProps;

	/**
	 * 自定义头部内容
	 */
	head?: any;

	/**
	 * 头部配置
	 * 当使用自定义 header slot 或 showHeader=false 时可以不提供
	 */
	headerConfig?: IHeaderProps;

	/**
	 * 加载中界面延迟显示的时间
	 */
	loadingDelay?: number;

	/**
	 * 主内容配置
	 * 可选，使用默认值
	 */
	mainContentConfig?: IMainContentProps;

	/**
	 * 元数据配置
	 */
	metaConfig?: IMetaProps;

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
	 * 当 showSidebar=false 时可以不提供
	 */
	sidebarConfig?: ISidebarProps;

	/**
	 * 是否启用 Astro ClientRouter
	 * @default true
	 */
	enableClientRouter?: boolean;
}
