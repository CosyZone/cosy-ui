import { getBaseButtonClasses } from "../../src/components/button/class-all";
import type { IButtonProps } from "./props";

/**
 * 计算 Button 组件的组合类名（Astro 版本）
 * @param props Button 组件的属性
 * @returns 组合后的类名数组
 */
export function getButtonCombinedClasses(props: IButtonProps): string[] {
	const {
		variant,
		size,
		shape,
		wide,
		block,
		loading,
		class: className,
	} = props;

	// 使用共用的工具函数计算基础类名
	const baseClasses = getBaseButtonClasses({
		variant,
		size,
		shape,
		wide,
		block,
		loading,
		class: className,
	});

	return baseClasses.filter(Boolean);
}
