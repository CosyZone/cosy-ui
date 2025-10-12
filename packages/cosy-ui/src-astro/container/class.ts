import type { IContainerProps } from "./props";
import { getBaseContainerClasses } from "../../src/components/container/class-all";

/**
 * 计算 Container 组件的组合类名
 * @param props Container 组件的 props
 * @returns 组合后的类名数组
 */
export function getContainerCombinedClasses(props: IContainerProps): string[] {
	// contentCentered 是 Astro 特定的属性，需要单独处理
	const { contentCentered = false, ...baseProps } = props;

	// 获取基础类名
	const baseClasses = getBaseContainerClasses(baseProps);

	// 如果需要内容居中，添加相应的类名
	if (contentCentered) {
		baseClasses.splice(1, 0, "cosy:flex cosy:justify-center cosy:items-center");
	}

	return baseClasses;
}
