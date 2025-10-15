import type { IAlertProps } from "./props";
import { getBaseAlertClasses } from "../../src/components/alert/class-all";

/**
 * 计算 Alert 组件的组合类名（Astro 版本）
 * @param props Alert 组件的属性
 * @returns 组合后的类名数组
 */
export function getAlertCombinedClasses(props: IAlertProps): string[] {
	const baseClasses = getBaseAlertClasses(props);

	return baseClasses;
}
