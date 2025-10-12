import type { IContainerPropsBase } from "./containerPropsBase";
import { getContainerBorderClasses } from "./class-border";
import { getContainerPaddingClasses } from "./class-padding";
import { getContainerMarginClass } from "./class-margin";
import { getContainerHeightClass } from "./class-height";
import { getContainerBackgroundClass } from "./class-background";
import { getContainerRoundedClass } from "./class-rounded";
import { getContainerFlexClasses } from "./class-flex";
import { getContainerWidthClass } from "./class-width";

/**
 * 计算 Container 组件的组合类名（用于基础接口）
 * @param props Container 组件的基础 props
 * @returns 组合后的类名数组
 */
export function getBaseContainerClasses(props: IContainerPropsBase): string[] {
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
		border = "none",
		borderColor,
		class: className = "",
		centered = true,
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
