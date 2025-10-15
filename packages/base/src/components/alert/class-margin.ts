import { marginClasses } from "../../common/margin";
import type { MarginSize } from "../../common/margin";

/**
 * 获取 Alert 组件的垂直外边距类名
 * @param marginY 垂直外边距大小
 * @returns 外边距类名
 */
export function getAlertMarginClass(marginY?: MarginSize): string {
	return marginY ? marginClasses[marginY] : "";
}
