import type { BackgroundColor } from "../../common/backgrounds";
import type { Size } from "../../common/size";
import type { PaddingSize } from "../../common/padding";
import type { HeightSize } from "../../common/height";
import type { BorderSize } from "../../common/border";

/**
 * Placeholder 组件的基础属性接口（与框架无关）
 */
export interface IPlaceholderPropsBase {
	/**
	 * 背景色
	 */
	background?: BackgroundColor;

	/**
	 * 边框尺寸
	 */
	border?: BorderSize;

	/**
	 * 自定义类名
	 */
	class?: string;

	/**
	 * 占位符高度
	 */
	height?: HeightSize;

	/**
	 * 内边距大小
	 */
	padding?: PaddingSize;

	/**
	 * 占位符宽度
	 */
	width?: Size;

	/**
	 * 是否使用柔和色背景
	 */
	muted?: boolean;
}
