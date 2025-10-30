import type { ImageMetadata } from "astro";
import type { BackgroundColor } from "./backgrounds";

export interface IMetaProps {
	title: string;
	description: string;
	keywords: string;
	author: string;
	robots: string;

	/**
	 * 图标
	 */
	favicon?: ImageMetadata;

	/**
	 * 基础路径，用于处理网站部署在二级目录的情况
	 * @default ""
	 */
	basePath?: string;

	/**
	 * 站点名称
	 */
	siteName?: string;

	/**
	 * 页面语言
	 * @default "zh-CN"
	 */
	lang?: string;

	/**
	 * 是否包含视口元标签
	 * @default true
	 */
	viewport?: boolean;

	/**
	 * 自定义CSS
	 */
	customStyles?: string;

	/**
	 * 自定义头部内容
	 */
	head?: any;

	/**
	 * 页面类名
	 */
	class?: string;

	/**
	 * 类名列表
	 */
	"class:list"?: any;

	/**
	 * 调试模式，显示边框
	 * @default false
	 */
	debug?: boolean;

	/**
	 * 预设背景色，使用通用背景色配置
	 * @default 'base-100'
	 */
	background?: BackgroundColor;

	/** 最小显示时间（毫秒），默认300ms，确保用户能看到加载状态 */
	loadingMinDisplayTime?: number;
}
