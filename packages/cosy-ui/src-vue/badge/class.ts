import type { IBadgeProps } from "./props";
import { getBaseBadgeClasses } from "../../src/components/badge/class-all";

/**
 * 计算 Badge 组件的组合类名（Vue 版本）
 * @param props Badge 组件的属性
 * @returns 组合后的类名字符串
 */
export function getBadgeCombinedClassesVue(props: IBadgeProps): string {
	const baseClasses = getBaseBadgeClasses(props);

	return baseClasses.filter(Boolean).join(" ");
}
