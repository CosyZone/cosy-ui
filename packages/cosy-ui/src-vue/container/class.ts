import type { IContainerProps } from "./props";
import { getBaseContainerClasses } from "../../src/components/container/class-all";

/**
 * 计算 Container 组件的组合类名（用于 Vue 版本）
 * @param props Container 组件的 props
 * @returns 组合后的类名数组
 */
export function getContainerCombinedClassesVue(
	props: IContainerProps,
): string[] {
	const baseClasses = getBaseContainerClasses(props);

	return baseClasses;
}
