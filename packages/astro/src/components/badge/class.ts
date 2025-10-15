import type { IBadgeProps } from "./props";
import { getBaseBadgeClasses } from "../../src/components/badge/class-all";

/**
 * 计算 Badge 组件的组合类名（Astro 版本）
 * @param props Badge 组件的属性
 * @returns 组合后的类名数组
 */
export function getBadgeCombinedClasses(props: IBadgeProps): string[] {
	const baseClasses = getBaseBadgeClasses(props);

	return baseClasses;
}
