import { getBaseHeadingClasses } from "../../src/components/heading/class-all";
import type { IHeadingProps } from "./types";

/**
 * 计算 Heading 组件的 Vue 版本组合类名
 * @param props Heading 组件的 Vue 版本 props
 * @returns 组合后的类名字符串
 */
export function getHeadingCombinedClassesVue(props: IHeadingProps): string {
	// 使用共享的基础类名计算函数（现在直接返回字符串）
	return getBaseHeadingClasses(props);
}
