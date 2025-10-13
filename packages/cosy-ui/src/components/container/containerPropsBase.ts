import type { BackgroundColor } from "../../../src/common/backgrounds";
import type { Size } from "../../../src/common/size";
import type { HeightSize } from "../../../src/common/height";
import type {
	FlexDirection,
	GapSize,
	FlexAlign,
	FlexJustify,
} from "../../../src/common/layout";
import type { PaddingSize } from "../../../src/common/padding";
import type { MarginSize } from "../../../src/common/margin";
import type { RoundedSize } from "../../../src/common/rounded";
import type { BorderSize, BorderColor } from "../../../src/common/border";
import type { FitMode } from "../../../src/common/fitmode";

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
