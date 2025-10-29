import type { BackgroundColor } from "../../common";

/**
 * Banner 组件的基础属性接口（与框架无关）
 */
export interface IBannerPropsBase {
	/**
	 * 动画效果类型
	 * - 'none': 无动画
	 * - 'fade': 仅淡入效果
	 * - 'slide': 仅上滑效果
	 * - 'both': 淡入和上滑效果
	 * @default 'both'
	 */
	animation?: "none" | "fade" | "slide" | "both";

	/**
	 * 背景颜色，支持基础颜色和渐变色彩
	 * @default 'primary'
	 */
	bgColor?: BackgroundColor;

	/**
	 * 自定义 CSS 类名，用于覆盖默认样式
	 */
	class?: string;

	/**
	 * 自定义 CSS 样式，可用于覆盖默认样式
	 */
	style?: string;

	/**
	 * 文本颜色，默认根据背景色自动设置，可手动指定颜色值
	 */
	textColor?: string;
}
