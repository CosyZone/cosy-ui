import type { BorderColor, BorderSize } from "../../../src/common/border";
import {
	getBorderClass,
	getBorderColorClass,
} from "../../../src/common/border";

/**
 * 计算 Container 组件的边框相关类名
 * @param border 边框尺寸
 * @param borderColor 边框颜色
 * @returns 边框相关的类名数组
 */
export function getContainerBorderClasses(
	border: BorderSize = "none",
	borderColor?: BorderColor,
): string[] {
	const borderClass = getBorderClass(border);
	const borderColorClass = getBorderColorClass(borderColor);

	return [borderClass, borderColorClass];
}
