import type { IPlaceholderPropsBase } from "./placeholderPropsBase";
import { getPlaceholderWidthClass } from "./class-width";
import { getPlaceholderHeightClass } from "./class-height";
import { getPlaceholderPaddingClass } from "./class-padding";
import { getPlaceholderBackgroundClass } from "./class-background";
import { getPlaceholderBorderClass } from "./class-border";
import { getPlaceholderMutedClass } from "./class-muted";

/**
 * 计算 Placeholder 组件的组合类名（用于基础接口）
 * @param props Placeholder 组件的基础 props
 * @returns 组合后的类名
 */
export function getBasePlaceholderClasses(
	props: IPlaceholderPropsBase,
): string {
	const {
		width = "md",
		height = "md",
		padding = "none",
		background,
		border = false,
		muted = false,
		class: className = "",
	} = props;

	// 构建width类名
	const widthClass = getPlaceholderWidthClass(width);

	// 构建height类名
	const heightClass = getPlaceholderHeightClass(height);

	// 构建padding类名
	const paddingClass = getPlaceholderPaddingClass(padding);

	// 构建background类名
	const backgroundClass = getPlaceholderBackgroundClass(background);

	// 构建border类名
	const borderClass = getPlaceholderBorderClass(border);

	// 构建muted类名
	const mutedClass = getPlaceholderMutedClass(muted);

	// 构建CSS类名
	const baseClasses = [
		"placeholder",
		widthClass,
		heightClass,
		paddingClass,
		backgroundClass,
		borderClass,
		mutedClass,
		className,
	];

	return baseClasses.filter(Boolean).join(" ").trim();
}
