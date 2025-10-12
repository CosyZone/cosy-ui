import { marginClasses } from "../../src/common/margin";
import type { MarginSize } from "../../src/common/margin";

/**
 * 计算 Container 组件的margin相关类名
 * @param margin 外边距大小
 * @returns margin相关的类名
 */
export function getContainerMarginClass(margin: MarginSize = "none"): string {
	return marginClasses[margin];
}
