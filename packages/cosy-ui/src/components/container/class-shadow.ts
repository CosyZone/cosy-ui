import type { ShadowSize } from "../../../src/common/shadow";
import { hoverShadowClasses, shadowClasses } from "../../../src/common/shadow";

/**
 * 计算 Container 组件的shadow相关类名
 * @param shadow 阴影大小
 * @returns shadow相关的类名
 */
export function getContainerShadowClass(shadow?: ShadowSize): string {
	// 如果没有设置shadow或者设置为none，返回空字符串
	if (!shadow || shadow === "none") {
		return "";
	}

	// 返回基础阴影类名和悬停阴影类名的组合
	return `${shadowClasses[shadow]} ${hoverShadowClasses[shadow]}`;
}
