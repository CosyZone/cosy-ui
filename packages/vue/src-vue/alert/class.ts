import type { IAlertProps } from "./props";
import { getBaseAlertClasses } from "../../src/components/alert/class-all";

/**
 * 计算 Alert 组件的组合类名（Vue 版本）
 * @param props Alert 组件的属性
 * @returns 组合后的类名字符串
 */
export function getAlertCombinedClassesVue(props: IAlertProps): string {
	const baseClasses = getBaseAlertClasses(props);

	return baseClasses.filter(Boolean).join(" ");
}
