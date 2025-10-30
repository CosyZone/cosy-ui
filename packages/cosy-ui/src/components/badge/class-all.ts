import type { IBadgePropsBase } from "./badgePropsBase";
import { getBadgeBaseClasses } from "./class-base";
import { getBadgeOutlineClass } from "./class-outline";
import { getBadgeSizeClass } from "./class-size";
import { getBadgeVariantClass } from "./class-variant";

/**
 * 计算 Badge 组件的组合类名（用于基础接口）
 * @param props Badge 组件的基础 props
 * @returns 组合后的类名数组
 */
export function getBaseBadgeClasses(props: IBadgePropsBase): string[] {
	const { variant, size, outline, class: className = "" } = props;

	// 构建基础类名
	const baseClasses = getBadgeBaseClasses();

	// 构建变体类名
	const variantClass = getBadgeVariantClass(variant);

	// 构建尺寸类名
	const sizeClass = getBadgeSizeClass(size);

	// 构建描边类名
	const outlineClass = getBadgeOutlineClass(outline);

	// 组合所有类名
	const classes = [
		...baseClasses,
		variantClass,
		sizeClass,
		outlineClass,
		className,
	];

	return classes;
}
