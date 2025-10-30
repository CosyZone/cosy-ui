import { getBaseContainerClasses } from "../../src/components/container/class-all";
import type { IContainerProps } from "./props";

/**
 * 计算 Container 组件的组合类名
 * @param props Container 组件的 props
 * @returns 组合后的类名数组
 */
export function getContainerCombinedClasses(props: IContainerProps): string[] {
	const baseClasses = getBaseContainerClasses(props);

	return baseClasses;
}
