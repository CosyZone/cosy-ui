type BackgroundColor = string;
type BorderColor = string;
type BorderSize = "none" | "sm" | "md" | "lg" | "xl";
type FitMode = "none" | "contain" | "cover";
type Size =
	| "none"
	| "3xs"
	| "2xs"
	| "xs"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "2xl"
	| "3xl"
	| "4xl"
	| "5xl"
	| "6xl"
	| "full";
type HeightSize = Size | "screen" | "auto";
type FlexAlign = "start" | "end" | "center" | "baseline" | "stretch";
type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";
type FlexJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
type GapSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type MarginSize =
	| "none"
	| "xs"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "2xl"
	| "3xl"
	| "4xl"
	| "5xl"
	| "6xl";
type PaddingSize =
	| "none"
	| "xs"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "2xl"
	| "3xl"
	| "4xl"
	| "5xl";
type RoundedSize =
	| "none"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "2xl"
	| "3xl"
	| "full";
type ShadowSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl";
/**
 * Container 组件的基础属性接口（与框架无关）
 */
export interface IContainerPropsBase {
	/**
	 * 宽高比（宽/高），设置后容器会保持这个比例
	 */
	aspectRatio?: number;

	/**
	 * 是否居中显示
	 * @default true
	 */
	centered?: boolean;

	/**
	 * 自定义类名
	 */
	class?: string;

	/**
	 * 是否让内部内容居中显示
	 * @default false
	 */
	contentCentered?: boolean;

	/**
	 * flex布局方向，不设置则不启用flex布局
	 */
	flex?: FlexDirection;

	/**
	 * 内容适配模式：none（默认）、contain（保持比例，尽量占满且不溢出）、cover（保持比例，铺满并可能裁剪）
	 */
	fit?: FitMode;

	/**
	 * flex项目间距
	 * @default "none"
	 */
	gap?: GapSize;

	/**
	 * 容器高度，不设置则不设置高度
	 */
	height?: HeightSize;

	/**
	 * flex项目水平对齐方式
	 */
	items?: FlexAlign;

	/**
	 * flex项目垂直对齐方式
	 */
	justify?: FlexJustify;

	/**
	 * 外边距大小
	 * @default "none"
	 */
	margin?: MarginSize;

	/**
	 * 是否使用柔和色样式（未激活状态）
	 * @default false
	 */
	muted?: boolean;

	/**
	 * 内边距大小
	 * @default "md"
	 */
	padding?: PaddingSize;

	/**
	 * 垂直内边距（上下）
	 */
	py?: PaddingSize;

	/**
	 * 顶部内边距
	 */
	pt?: PaddingSize;

	/**
	 * 底部内边距
	 */
	pb?: PaddingSize;

	/**
	 * 水平内边距（左右）
	 */
	px?: PaddingSize;

	/**
	 * 左侧内边距
	 */
	pl?: PaddingSize;

	/**
	 * 右侧内边距
	 */
	pr?: PaddingSize;

	/**
	 * 阴影大小
	 * @default "none"
	 */
	shadow?: ShadowSize;

	/**
	 * 容器宽度
	 */
	width?: Size;

	/**
	 * 圆角大小
	 * @default "none"
	 */
	rounded?: RoundedSize;

	/**
	 * 背景色
	 * @default undefined
	 */
	background?: BackgroundColor;

	/**
	 * 边框尺寸
	 * @default "none"
	 */
	border?: BorderSize;

	/**
	 * 边框颜色
	 * @default undefined
	 */
	borderColor?: BorderColor;
}

/**
 * Container 组件的 Vue 版本属性接口（继承基础接口并扩展 Vue 特定属性）
 */
export interface IContainerProps extends IContainerPropsBase {
	/**
	 * 背景图片地址（Vue 版本只支持字符串格式的背景图地址）
	 */
	backgroundImage?: string;
}
