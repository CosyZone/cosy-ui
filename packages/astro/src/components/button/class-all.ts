import type { IButtonPropsBase } from "./buttonPropsBase";
import { getButtonBaseClasses } from "./class-base";
import { getButtonVariantClass } from "./class-variant";
import { getButtonSizeClass } from "./class-size";
import { getButtonShapeClass } from "./class-shape";
import { getButtonModifierClasses } from "./class-modifiers";
import { getButtonGradientClass } from "./class-gradient";

/**
 * 计算 Button 组件的组合类名（用于基础接口）
 * @param props Button 组件的基础 props
 * @returns 组合后的类名数组
 */
export function getBaseButtonClasses(props: IButtonPropsBase): string[] {
	const {
		variant,
		size,
		shape,
		wide,
		block,
		loading,
		class: className = "",
	} = props;

	// 构建基础类名
	const baseClasses = getButtonBaseClasses();

	// 构建变体类名
	const variantClass = getButtonVariantClass(variant);

	// 构建尺寸类名
	const sizeClass = getButtonSizeClass(size);

	// 构建形状类名
	const shapeClass = getButtonShapeClass(shape);

	// 构建修饰符类名
	const modifierClasses = getButtonModifierClasses(wide, block, loading);

	// 构建渐变类名（如果适用）
	const gradientClass = getButtonGradientClass(variant as any);

	// 组合所有类名
	const classes = [
		...baseClasses,
		variantClass,
		sizeClass,
		shapeClass,
		...modifierClasses,
		gradientClass,
		className,
	];

	return classes;
}
