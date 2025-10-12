import {
	flexClasses,
	gapClasses,
	itemsClasses,
	justifyClasses,
} from "../../src/common/layout";
import type {
	FlexDirection,
	GapSize,
	FlexAlign,
	FlexJustify,
} from "../../src/common/layout";

/**
 * 计算 Container 组件的flex相关类名
 * @param flex flex布局方向
 * @param gap flex项目间距
 * @param items flex项目水平对齐方式
 * @param justify flex项目垂直对齐方式
 * @returns flex相关的类名数组
 */
export function getContainerFlexClasses(
	flex?: FlexDirection,
	gap: GapSize = "none",
	items?: FlexAlign,
	justify?: FlexJustify,
): string[] {
	return [
		flex ? flexClasses[flex] : "",
		flex ? gapClasses[gap] : "",
		items && flex ? itemsClasses[items] : "",
		justify && flex ? justifyClasses[justify] : "",
	].filter(Boolean); // 过滤掉空字符串
}
