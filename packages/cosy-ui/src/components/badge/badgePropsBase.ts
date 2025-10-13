/**
 * Badge 组件的基础属性接口（与框架无关）
 */
export interface IBadgePropsBase {
	/**
	 * 徽章的颜色变体
	 */
	variant?:
		| "primary"
		| "secondary"
		| "accent"
		| "ghost"
		| "info"
		| "success"
		| "warning"
		| "error";

	/**
	 * 徽章的尺寸
	 */
	size?: "xs" | "sm" | "md" | "lg";

	/**
	 * 徽章是否为描边样式
	 * @default false
	 */
	outline?: boolean;

	/**
	 * 自定义 CSS 类名，用于覆盖默认样式
	 */
	class?: string;
}
