import type { IAlertPropsBase } from "./alertPropsBase";
import { getAlertBaseClasses } from "./class-base";
import { getAlertMarginClass } from "./class-margin";
import { getAlertTypeClass } from "./class-type";
import { getAlertVariantClass } from "./class-variant";

/**
 * 计算 Alert 组件的组合类名（用于基础接口）
 * @param props Alert 组件的基础 props
 * @returns 组合后的类名数组
 */
export function getBaseAlertClasses(props: IAlertPropsBase): string[] {
	const {
		type = "info",
		variant = "solid",
		marginY,
		class: className = "",
	} = props;

	// 构建基础类名
	const baseClasses = getAlertBaseClasses();

	// 构建类型类名
	const typeClass = getAlertTypeClass(type);

	// 构建变体类名
	const variantClass = getAlertVariantClass(variant);

	// 构建margin类名
	const marginClass = getAlertMarginClass(marginY);

	// 组合所有类名
	const classes = [
		...baseClasses,
		typeClass,
		variantClass,
		"cosy:alert-horizontal",
		marginClass,
		className,
	];

	return classes;
}
