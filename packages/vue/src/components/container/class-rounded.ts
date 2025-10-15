import { roundedClasses } from "../../../src/common/rounded";
import type { RoundedSize } from "../../../src/common/rounded";

/**
 * 计算 Container 组件的rounded相关类名
 * @param rounded 圆角大小
 * @returns rounded相关的类名
 */
export function getContainerRoundedClass(
	rounded: RoundedSize = "none",
): string {
	return roundedClasses[rounded];
}
