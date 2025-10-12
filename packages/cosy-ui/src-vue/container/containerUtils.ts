import type { IContainerProps } from "./containerProps";
import { getBaseContainerClasses } from "../../src/components/container/containerUtilsBase";
import { getBorderClass } from "../../src/common/border";

/**
 * 计算 Container 组件的组合类名（用于 Vue 版本）
 * @param props Container 组件的 props
 * @returns 组合后的类名数组
 */
export function getContainerCombinedClassesVue(
	props: IContainerProps,
): string[] {
	const baseClasses = getBaseContainerClasses(props);

	// 处理 Vue 版本特有的属性
	const borderValue = props.border ? "md" : "none";

	// 添加 Vue 版本特有的类名
	const vueClasses = [getBorderClass(borderValue)];

	return [...baseClasses, ...vueClasses];
}
