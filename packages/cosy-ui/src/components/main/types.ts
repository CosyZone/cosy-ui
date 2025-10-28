import type { BackgroundColor } from "../../common/backgrounds";
import type { PaddingSize } from "../../common/padding";
import type { BorderSize } from "../../common/border";

export interface IMainContentProps {
	/**
	 * 容器大小
	 * @default "md"
	 */
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";

	/**
	 * 水平内边距（通过 Container 组件的 padding 属性设置）
	 * @default "md"
	 */
	padding?: "none" | "sm" | "md" | "lg" | "xl";

	/**
	 * 布局方式
	 * @default 'column'
	 */
	layout?: "row" | "column";

	/**
	 * 当前语言
	 */
	currentLocale?: string;

	/**
	 * 垂直内边距
	 * @default "md"
	 */
	py?: PaddingSize | string;

	/**
	 * 顶部内边距
	 * @default undefined
	 */
	pt?: PaddingSize | string;

	/**
	 * 底部内边距
	 * @default undefined
	 */
	pb?: PaddingSize | string;

	/**
	 * 左侧内边距
	 * @default undefined
	 */
	pl?: PaddingSize | string;

	/**
	 * 右侧内边距
	 * @default undefined
	 */
	pr?: PaddingSize | string;

	/**
	 * 水平内边距
	 * @default undefined
	 */
	px?: PaddingSize | string;

	/**
	 * 是否居中显示内容
	 * @default true
	 */
	centered?: boolean;

	/**
	 * 是否为文章布局
	 * @default false
	 */
	isArticle?: boolean;

	/**
	 * 是否显示目录
	 * @default false
	 */
	showTableOfContents?: boolean;

	/**
	 * 背景颜色
	 * @default undefined
	 */
	backgroundColor?: BackgroundColor | string;

	/**
	 * 边框尺寸
	 * @default undefined
	 */
	border?: BorderSize;

	/**
	 * HTML id 属性
	 */
	id?: string;

	/**
	 * 类名
	 */
	class?: string;

	/**
	 * 类名列表
	 */
	"class:list"?: any;
}
