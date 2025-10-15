import type { MarginSize } from "../../../src/common/margin";

/**
 * Alert 组件的基础属性接口（与框架无关）
 */
export interface IAlertPropsBase {
	/**
	 * 提示类型，影响颜色和图标
	 * @default "info"
	 */
	type?: "info" | "success" | "warning" | "error";

	/**
	 * 提示标题，可选
	 */
	title?: string;

	/**
	 * 描述文本，显示在标题下方，字体较小且透明度降低
	 */
	description?: string;

	/**
	 * 自定义 CSS 类名，用于覆盖默认样式
	 */
	class?: string;

	/**
	 * 是否可关闭，设置为 false 时隐藏关闭按钮
	 * @default true
	 */
	closable?: boolean;

	/**
	 * 是否显示图标，设置为 false 时隐藏类型对应的图标
	 * @default true
	 */
	showIcon?: boolean;

	/**
	 * 样式变体，支持 solid（实心）、outline（描边）、dash（虚线）、soft（柔和）四种风格
	 * @default "solid"
	 */
	variant?: "solid" | "outline" | "dash" | "soft";

	/**
	 * 垂直方向外边距大小，支持预设的尺寸值
	 */
	marginY?: MarginSize;
}
