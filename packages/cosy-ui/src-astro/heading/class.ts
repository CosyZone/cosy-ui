import type { IHeadingProps } from "./props";
import { getBaseHeadingClasses } from "../../src/components/heading/class-all";

/**
 * 计算 Heading 组件的 Astro 版本组合类名
 * @param props Heading 组件的 Astro 版本 props
 * @returns 组合后的类名字符串
 */
export function getHeadingCombinedClassesAstro(props: IHeadingProps): string {
	// 使用共享的基础类名计算函数
	const baseClasses = getBaseHeadingClasses(props);

	// 过滤掉空字符串并用空格连接
	return baseClasses.filter(Boolean).join(" ");
}
