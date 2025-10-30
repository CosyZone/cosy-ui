/**
 * Avatar 组件的基础属性接口（与框架无关）
 */
export interface IAvatarPropsBase {
	/**
	 * 用户名称
	 */
	userName?: string;

	/**
	 * 用户头像URL
	 */
	avatar?: string;

	/**
	 * 头像尺寸
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg" | "xl";
}
