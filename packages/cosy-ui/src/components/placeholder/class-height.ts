import type { HeightSize } from "../../../src/common/height";
import { heightClasses } from "../../../src/common/height";

/**
 * 计算 Placeholder 组件的height相关类名
 * @param height 高度尺寸
 * @returns height相关的类名
 */
export function getPlaceholderHeightClass(height: HeightSize = "md"): string {
	return heightClasses[height] || "";
}
