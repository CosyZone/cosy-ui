import { widthClasses } from "../../../src/common/width";
import type { Size } from "../../../src/common/size";

/**
 * 计算 Placeholder 组件的width相关类名
 * @param width 宽度尺寸
 * @returns width相关的类名
 */
export function getPlaceholderWidthClass(width: Size = "md"): string {
    return widthClasses[width] || "";
}