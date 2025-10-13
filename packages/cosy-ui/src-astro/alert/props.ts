import type { HTMLAttributes } from "astro/types";
import type { IAlertPropsBase } from "../../src/components/alert/alertPropsBase";

/**
 * Alert 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface IAlertProps
	extends IAlertPropsBase,
		Omit<HTMLAttributes<"div">, keyof IAlertPropsBase> {
	// 继承基础属性和 HTML div 属性，但避免冲突
}
