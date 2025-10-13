import type { ILinkProps } from "./props";
import { getBaseLinkClasses } from "../../src/components/link/class-all";

/**
 * 计算 Link 组件的 Vue 版本组合类名
 * @param props Link 组件的 Vue 版本 props
 * @returns 组合后的类名字符串
 */
export function getLinkCombinedClassesVue(props: ILinkProps): string {
	// 使用共享的基础类名计算函数
	const baseClasses = getBaseLinkClasses(props);

	// 过滤掉空字符串并用空格连接
	return baseClasses.filter(Boolean).join(" ");
}
