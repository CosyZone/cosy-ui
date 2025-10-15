import { heightClasses } from "../../common/height";
import type { HeightSize } from "../../common/height";

/**
 * 计算 Placeholder 组件的height相关类名
 * @param height 高度尺寸
 * @returns height相关的类名
 */
export function getPlaceholderHeightClass(height: HeightSize = "md"): string {
	return heightClasses[height] || "";
}
