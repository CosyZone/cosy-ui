import { widthClasses } from "../../../src/common/width";
import type { WidthSize } from "../../../src/common/width";

/**
 * 计算 Container 组件的width相关类名
 * @param width 容器宽度
 * @returns width相关的类名
 */
export function getContainerWidthClass(width: WidthSize = "md"): string {
	return widthClasses[width];
}
