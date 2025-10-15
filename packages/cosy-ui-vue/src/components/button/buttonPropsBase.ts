/**
 * Button 组件的基础属性接口（与框架无关）
 */
export interface IButtonPropsBase {
	/**
	 * 是否为块级显示，设置为 true 时按钮占满容器宽度
	 * @default false
	 */
	block?: boolean;

	/**
	 * 自定义 CSS 类名，用于覆盖默认样式
	 */
	class?: string;

	/**
	 * 是否禁用按钮，设置为 true 时按钮不可点击
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * 表单提交方法，支持 dialog 等特殊值
	 */
	formmethod?: string;

	/**
	 * 链接地址，设置后按钮变为链接形式
	 */
	href?: string;

	/**
	 * 是否显示加载状态，设置为 true 时显示加载动画
	 * @default false
	 */
	loading?: boolean;

	/**
	 * 点击事件处理函数
	 */
	onClick?: () => void;

	/**
	 * 按钮形状，支持 circle（圆形）和 square（方形）
	 */
	shape?: "circle" | "square";

	/**
	 * 按钮尺寸，支持 lg、md、sm、xs 四种尺寸
	 * @default "md"
	 */
	size?: "lg" | "md" | "sm" | "xs";

	/**
	 * 链接目标，支持 _self、_blank、_parent、_top
	 */
	target?: "_self" | "_blank" | "_parent" | "_top";

	/**
	 * 按钮类型，支持 button、submit、reset
	 * @default "button"
	 */
	type?: "button" | "submit" | "reset";

	/**
	 * 按钮样式变体，支持多种预设样式和渐变效果
	 * @default "primary"
	 */
	variant?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error"
		| "ghost"
		| "link"
		| "outline"
		| "neutral"
		| "gradient-sky"
		| "gradient-watermelon"
		| "gradient-lemon"
		| "gradient-grape"
		| "gradient-mango"
		| "gradient-forest"
		| "gradient-ocean"
		| "gradient-sunset"
		| "gradient-flower"
		| "gradient-pitaya"
		| "gradient-banana"
		| "gradient-blueberry"
		| "gradient-kiwi";

	/**
	 * 是否为宽按钮，设置为 true 时按钮宽度增加
	 * @default false
	 */
	wide?: boolean;
}
