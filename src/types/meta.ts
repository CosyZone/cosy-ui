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
	head?: astroHTML.JSX.Element;

	/**
	 * 页面类名
	 */
	class?: string;

	/**
	 * 类名列表
	 */
	'class:list'?: any;
}
