import { heightClasses } from "../../src/common/height";
import type { HeightSize } from "../../src/common/height";

/**
 * 计算 Container 组件的height相关类名
 * @param height 容器高度
 * @returns height相关的类名
 */
export function getContainerHeightClass(height?: HeightSize): string {
	return height ? heightClasses[height] : "";
}
