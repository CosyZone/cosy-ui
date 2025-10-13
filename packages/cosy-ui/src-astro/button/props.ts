import type { HTMLAttributes } from "astro/types";
import type { IButtonPropsBase } from "../../src/components/button/buttonPropsBase";

/**
 * Button 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface IButtonProps
	extends IButtonPropsBase,
		Omit<HTMLAttributes<"button">, keyof IButtonPropsBase> {
	// 继承基础属性和 HTML button 属性，但避免冲突
}
