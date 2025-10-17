import type { BackgroundColor } from "../../../src/common/backgrounds";

/**
 * ApplePhone 组件的基础属性接口（与框架无关）
 */
export interface IApplePhonePropsBase {
	/**
	 * 窗口高度选项
	 * @default 'lg'
	 */
	height?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

	/**
	 * 窗口标题
	 * @default ''
	 */
	title?: string;

	/**
	 * 是否显示阴影效果
	 * @default true
	 */
	withShadow?: boolean;

	/**
	 * 是否显示 iPhone 边框
	 * @default true
	 */
	showFrame?: boolean;

	/**
	 * 内容区域背景色
	 * @default undefined
	 */
	backgroundColor?: BackgroundColor;
}
