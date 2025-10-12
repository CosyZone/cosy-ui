import { paddingClasses } from "../../../src/common/padding";
import {
	paddingYClasses,
	paddingTopClasses,
	paddingBottomClasses,
	paddingLeftClasses,
	paddingRightClasses,
	paddingXClasses,
} from "../../../src/common/padding-axis";
import type { PaddingSize } from "../../../src/common/padding";

/**
 * 计算 Container 组件的padding相关类名
 * @param padding 内边距大小
 * @param py 垂直内边距（上下）
 * @param pt 顶部内边距
 * @param pb 底部内边距
 * @param px 水平内边距（左右）
 * @param pl 左侧内边距
 * @param pr 右侧内边距
 * @returns padding相关的类名数组
 */
export function getContainerPaddingClasses(
	padding: PaddingSize = "md",
	py?: PaddingSize,
	pt?: PaddingSize,
	pb?: PaddingSize,
	px?: PaddingSize,
	pl?: PaddingSize,
	pr?: PaddingSize,
): string[] {
	// 构建轴向内边距类名
	const pyClass = py
		? paddingYClasses[py as keyof typeof paddingYClasses] || ""
		: "";

	const paddingTopClass = pt
		? paddingTopClasses[pt as keyof typeof paddingTopClasses] || ""
		: "";

	const paddingBottomClass = pb
		? paddingBottomClasses[pb as keyof typeof paddingBottomClasses] || ""
		: "";

	const paddingLeftClass = pl
		? paddingLeftClasses[pl as keyof typeof paddingLeftClasses] || ""
		: "";

	const paddingRightClass = pr
		? paddingRightClasses[pr as keyof typeof paddingRightClasses] || ""
		: "";

	const paddingXClass = px
		? paddingXClasses[px as keyof typeof paddingXClasses] || ""
		: "";

	return [
		paddingClasses[padding],
		pyClass,
		paddingTopClass,
		paddingBottomClass,
		paddingLeftClass,
		paddingRightClass,
		paddingXClass,
	].filter(Boolean); // 过滤掉空字符串
}
