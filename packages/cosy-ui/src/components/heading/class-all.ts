import type { IHeadingPropsBase } from "./headingPropsBase";
import { cn } from "../../class";
import { getHeadingAlignClass } from "./class-align";
import { getHeadingBackgroundClass } from "./class-background";
import { getHeadingColorClass } from "./class-color";
import { getHeadingMarginClass } from "./class-margin";
import { getHeadingPaddingClass } from "./class-padding";
import { getHeadingSizeClass } from "./class-size";
import { getHeadingWeightClass } from "./class-weight";
import { getHeadingUnderlineClass } from "./class-underline";

/**
 * 计算 Heading 组件的组合类名（用于基础接口）
 * @param props Heading 组件的基础 props
 * @returns 组合后的类名字符串
 */
export function getBaseHeadingClasses(props: IHeadingPropsBase): string {
	const {
		align = "left",
		background,
		color = "default",
		class: className = "",
		level = 2,
		margin = "md",
		padding = "none",
		underline = false,
		weight,
	} = props;

	// 构建各个部分的类名
	const alignClass = getHeadingAlignClass(align);
	const backgroundClass = getHeadingBackgroundClass(background);
	const colorClass = getHeadingColorClass(color);
	const marginClass = getHeadingMarginClass(margin);
	const paddingClass = getHeadingPaddingClass(padding);
	const sizeClass = getHeadingSizeClass(level);
	const weightClass = getHeadingWeightClass(level, weight);
	const underlineClass = getHeadingUnderlineClass(underline);

	// 使用 classBuilder 组合所有类名
	const headingClass = cn()
		.add("heading")
		.w("full")
		.add(
			sizeClass,
			weightClass,
			colorClass,
			alignClass,
			underlineClass,
			marginClass,
			backgroundClass,
			paddingClass,
			className,
		)
		.build();

	return headingClass;
}
