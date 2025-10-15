import { getBackgroundClass } from "../../../src/common/backgrounds";
import type { BackgroundColor } from "../../../src/common/backgrounds";

/**
 * 计算 Placeholder 组件的background相关类名
 * @param background 背景色
 * @returns background相关的类名
 */
export function getPlaceholderBackgroundClass(
	background?: BackgroundColor,
): string {
	return getBackgroundClass(background);
}
