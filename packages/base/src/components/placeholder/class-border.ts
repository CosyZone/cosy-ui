import type { BorderSize } from "../../common/border";
import { getBorderClass } from "../../common/border";

/**
 * 计算 Placeholder 组件的边框相关类名
 * @param border 边框尺寸
 * @returns 边框相关的类名
 */
export function getPlaceholderBorderClass(border: BorderSize = "none"): string {
	return getBorderClass(border);
}
