import { paddingClasses } from "../../common/padding";
import type { PaddingSize } from "../../common/padding";

/**
 * 计算 Placeholder 组件的padding相关类名
 * @param padding 内边距尺寸
 * @returns padding相关的类名
 */
export function getPlaceholderPaddingClass(
	padding: PaddingSize = "none",
): string {
	return paddingClasses[padding] || "";
}
