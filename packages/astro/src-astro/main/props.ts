import type { IMainContentProps } from "./types";

/**
 * Main 组件 Props 构建器（修饰器/链式写法）
 *
 * 用于以链式方式配置 Main 的各项属性，最后通过 build() 输出完整的 props。
 */
export interface IMainPropsBuilder {
	/**
	 * 是否居中显示内容
	 * @default true
	 */
	centered(value?: boolean): IMainPropsBuilder;
	/** 页面类名（追加到根元素） */
	class(value: NonNullable<IMainContentProps["class"]>): IMainPropsBuilder;
	/** 类名列表（Astro 专用 class:list） */
	classList(
		value: NonNullable<IMainContentProps["class:list"]>,
	): IMainPropsBuilder;
	/** HTML id 属性 */
	id(value: NonNullable<IMainContentProps["id"]>): IMainPropsBuilder;
	/**
	 * 是否为文章布局
	 * @default false
	 */
	isArticle(value?: boolean): IMainPropsBuilder;
	/**
	 * 布局方式
	 * @default 'column'
	 */
	layout(value: NonNullable<IMainContentProps["layout"]>): IMainPropsBuilder;
	/**
	 * 水平内边距（委托给 Container 的 padding）
	 * @default 'md'
	 */
	padding(value: NonNullable<IMainContentProps["padding"]>): IMainPropsBuilder;
	/**
	 * 垂直内边距
	 * @default 'md'
	 */
	py(value: NonNullable<IMainContentProps["py"]>): IMainPropsBuilder;
	/**
	 * 顶部内边距
	 * @default undefined
	 */
	pt(value: NonNullable<IMainContentProps["pt"]>): IMainPropsBuilder;
	/**
	 * 底部内边距
	 * @default undefined
	 */
	pb(value: NonNullable<IMainContentProps["pb"]>): IMainPropsBuilder;
	/**
	 * 左侧内边距
	 * @default undefined
	 */
	pl(value: NonNullable<IMainContentProps["pl"]>): IMainPropsBuilder;
	/**
	 * 右侧内边距
	 * @default undefined
	 */
	pr(value: NonNullable<IMainContentProps["pr"]>): IMainPropsBuilder;
	/**
	 * 水平内边距
	 * @default undefined
	 */
	px(value: NonNullable<IMainContentProps["px"]>): IMainPropsBuilder;
	/**
	 * 容器大小
	 * @default 'md'
	 */
	size(value: NonNullable<IMainContentProps["size"]>): IMainPropsBuilder;
	/** 背景颜色（支持 common 预设或自定义色值） */
	backgroundColor(
		value: NonNullable<IMainContentProps["backgroundColor"]>,
	): IMainPropsBuilder;
	/** 边框尺寸 */
	border(value: NonNullable<IMainContentProps["border"]>): IMainPropsBuilder;
	/**
	 * 是否显示目录（文章模式使用）
	 * @default false
	 */
	showTableOfContents(value?: boolean): IMainPropsBuilder;
	/** 当前语言（目录等功能依赖） */
	currentLocale(
		value: NonNullable<IMainContentProps["currentLocale"]>,
	): IMainPropsBuilder;
	/** 构建并返回完整的 Main 组件 Props */
	build(): IMainContentProps;
}

/**
 * 创建 Main 组件 Props 构建器
 * @param initial 初始值（可选）
 * @returns IMainPropsBuilder 链式 API
 */
export function createMainProps(
	initial: Partial<IMainContentProps> = {},
): IMainPropsBuilder {
	let props: IMainContentProps = {
		size: "md",
		padding: "md",
		py: "md",
		centered: true,
		layout: "column",
		isArticle: false,
		showTableOfContents: false,
		...initial,
	} as IMainContentProps;

	const api: IMainPropsBuilder = {
		centered(value = true) {
			props = { ...props, centered: value };
			return api;
		},
		class(value) {
			props = { ...props, class: value };
			return api;
		},
		classList(value) {
			props = { ...props, "class:list": value };
			return api;
		},
		id(value) {
			props = { ...props, id: value };
			return api;
		},
		isArticle(value = false) {
			props = { ...props, isArticle: value };
			return api;
		},
		layout(value) {
			props = { ...props, layout: value };
			return api;
		},
		padding(value) {
			props = { ...props, padding: value };
			return api;
		},
		py(value) {
			props = { ...props, py: value };
			return api;
		},
		pt(value) {
			props = { ...props, pt: value };
			return api;
		},
		pb(value) {
			props = { ...props, pb: value };
			return api;
		},
		pl(value) {
			props = { ...props, pl: value };
			return api;
		},
		pr(value) {
			props = { ...props, pr: value };
			return api;
		},
		px(value) {
			props = { ...props, px: value };
			return api;
		},
		size(value) {
			props = { ...props, size: value };
			return api;
		},
		backgroundColor(value) {
			props = { ...props, backgroundColor: value };
			return api;
		},
		border(value) {
			props = { ...props, border: value };
			return api;
		},
		showTableOfContents(value = false) {
			props = { ...props, showTableOfContents: value };
			return api;
		},
		currentLocale(value) {
			props = { ...props, currentLocale: value };
			return api;
		},
		build() {
			return props;
		},
	};

	return api;
}

/**
 * Main 组件 Props 构建器别名
 * 与 createMainProps 等价
 */
export const MainProps = createMainProps;
