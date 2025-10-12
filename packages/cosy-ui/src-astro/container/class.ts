import type { IContainerProps } from "./props";
import { getContainerBorderClasses } from "./class-border";
import { getContainerPaddingClasses } from "./class-padding";
import { getContainerMarginClass } from "./class-margin";
import { getContainerHeightClass } from "./class-height";
import { getContainerBackgroundClass } from "./class-background";
import { getContainerRoundedClass } from "./class-rounded";
import { getContainerFlexClasses } from "./class-flex";
import { getContainerWidthClass } from "./class-width";

/**
 * 计算 Container 组件的组合类名
 * @param props Container 组件的 props
 * @returns 组合后的类名数组
 */
export function getContainerCombinedClasses(props: IContainerProps): string[] {
	const {
		width = "md",
		padding = "md",
		py,
		pt,
		pb,
		px,
		pl,
		pr,
		margin = "none",
		rounded = "none",
		background,
		flex,
		gap = "none",
		items,
		justify,
		height,
		class: className = "",
		centered = true,
		contentCentered = false,
		border = "none",
		borderColor,
	} = props;

	// 构建padding类名
	const paddingClassesArray = getContainerPaddingClasses(
		padding,
		py,
		pt,
		pb,
		px,
		pl,
		pr,
	);

	// 构建margin类名
	const marginClass = getContainerMarginClass(margin);

	// 构建height类名
	const heightClass = getContainerHeightClass(height);

	// 构建background类名
	const backgroundClass = getContainerBackgroundClass(background);

	// 构建rounded类名
	const roundedClass = getContainerRoundedClass(rounded);

	// 构建width类名
	const widthClass = getContainerWidthClass(width);

	// 构建flex类名
	const flexClassesArray = getContainerFlexClasses(flex, gap, items, justify);

	// 构建边框类名
	const borderClasses = getContainerBorderClasses(border, borderColor);

	// 构建CSS类名
	return [
		"cosy:w-full",
		centered ? "cosy:mx-auto" : "",
		contentCentered ? "cosy:flex cosy:justify-center cosy:items-center" : "",
		widthClass,
		...paddingClassesArray,
		marginClass,
		roundedClass,
		backgroundClass,
		...borderClasses,
		...flexClassesArray,
		heightClass,
		className,
	];
}
