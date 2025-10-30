import { getBaseButtonClasses } from "../../src/components/button/class-all";
import type { IButtonProps } from "./props";

/**
 * 将可能的对象形式的 class 转换为字符串
 * @param className 类名，可以是字符串或对象
 * @returns 字符串形式的类名
 */
function normalizeClass(className: string | object | undefined): string {
	if (!className) return "";
	if (typeof className === "string") return className;
	if (typeof className === "object") {
		return Object.entries(className)
			.filter(([, value]) => value)
			.map(([key]) => key)
			.join(" ");
	}
	return "";
}

/**
 * 计算 Button 组件的组合类名（Vue 版本）
 * @param props Button 组件的属性
 * @returns 组合后的类名字符串
 */
export function getButtonCombinedClassesVue(props: IButtonProps): string {
	const {
		variant,
		size,
		shape,
		wide,
		block,
		loading,
		class: className,
	} = props;

	// 规范化 class 属性
	const normalizedClass = normalizeClass(className);

	// 使用共用的工具函数计算基础类名
	const baseClasses = getBaseButtonClasses({
		variant,
		size,
		shape,
		wide,
		block,
		loading,
		class: normalizedClass,
	});

	return baseClasses.filter(Boolean).join(" ");
}
