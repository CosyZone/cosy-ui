import {
	type BackgroundColor,
	getBackgroundClass,
} from "../../../src/common/backgrounds";

/**
 * 计算 Heading 组件的背景色相关类名
 * @param background 背景色
 * @returns 背景色相关的类名
 */
export function getHeadingBackgroundClass(
	background?: BackgroundColor,
): string {
	return getBackgroundClass(background);
}
