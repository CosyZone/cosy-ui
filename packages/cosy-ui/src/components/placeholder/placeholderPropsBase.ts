import type { BackgroundColor } from "../../../src/common/backgrounds";
import type { Size } from "../../../src/common/size";
import type { PaddingSize } from "../../../src/common/padding";
import type { HeightSize } from "../../../src/common/height";

/**
 * Placeholder 组件的基础属性接口（与框架无关）
 */
export interface IPlaceholderPropsBase {
	/**
	 * 背景色
	 */
	background?: BackgroundColor;

	/**
	 * 是否显示边框
	 */
	border?: boolean;

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
