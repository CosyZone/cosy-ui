/**
 * Container 组件内边距属性验证工具
 *
 * @description
 * 包含 Container 组件内边距属性冲突检测和验证逻辑
 */

/**
 * Padding 属性冲突检测结果
 */
export interface PaddingConflictResult {
	/** 是否存在冲突 */
	hasConflict: boolean;
	/** 冲突类型 */
	conflictType?: string;
	/** 冲突描述 */
	message?: string;
}

/**
 * 检查 padding 属性冲突
 *
 * @param px 水平内边距值
 * @param pl 左侧内边距值
 * @param pr 右侧内边距值
 * @param py 垂直内边距值
 * @param pt 顶部内边距值
 * @param pb 底部内边距值
 * @returns 冲突检测结果
 */
export function validatePaddingConflict(
	px?: string,
	pl?: string,
	pr?: string,
	py?: string,
	pt?: string,
	pb?: string,
): PaddingConflictResult {
	const hasPaddingX = px && px !== "none";
	const hasPaddingLeft = pl && pl !== "none";
	const hasPaddingRight = pr && pr !== "none";
	const hasPaddingY = py && py !== "none";
	const hasPaddingTop = pt && pt !== "none";
	const hasPaddingBottom = pb && pb !== "none";

	// 检查水平内边距冲突
	if (hasPaddingX && (hasPaddingLeft || hasPaddingRight)) {
		return {
			hasConflict: true,
			conflictType: "px-with-pl-pr",
			message:
				"不能同时使用 px 和 pl/pr 属性，因为它们都会设置水平内边距。请只使用其中一种方式。",
		};
	}

	// 检查垂直内边距冲突
	if (hasPaddingY && (hasPaddingTop || hasPaddingBottom)) {
		return {
			hasConflict: true,
			conflictType: "py-with-pt-pb",
			message:
				"不能同时使用 py 和 pt/pb 属性，因为它们都会设置垂直内边距。请只使用其中一种方式。",
		};
	}

	return {
		hasConflict: false,
	};
}

/**
 * 获取 padding 冲突的解决方案建议
 *
 * @param conflictType 冲突类型
 * @returns 解决方案建议
 */
export function getPaddingConflictSolution(conflictType: string): string[] {
	switch (conflictType) {
		case "px-with-pl-pr":
			return [
				"使用 px 设置左右相同的内边距",
				"或使用 pl 和 pr 分别设置左右内边距",
			];
		case "py-with-pt-pb":
			return [
				"使用 py 设置上下相同的内边距",
				"或使用 pt 和 pb 分别设置上下内边距",
			];
		default:
			return [];
	}
}

/**
 * 创建 padding 冲突错误信息
 *
 * @param px 水平内边距值
 * @param pl 左侧内边距值
 * @param pr 右侧内边距值
 * @param py 垂直内边距值
 * @param pt 顶部内边距值
 * @param pb 底部内边距值
 * @returns 错误信息对象
 */
export function createPaddingConflictError(
	px?: string,
	pl?: string,
	pr?: string,
	py?: string,
	pt?: string,
	pb?: string,
): {
	title: string;
	message: string;
	solutions: string[];
	type: string;
} | null {
	const conflict = validatePaddingConflict(px, pl, pr, py, pt, pb);

	if (!conflict.hasConflict) {
		return null;
	}

	const solutions = getPaddingConflictSolution(conflict.conflictType || "");

	return {
		title: "Container 组件属性冲突",
		message: conflict.message || "属性配置存在冲突",
		solutions,
		type: "conflict",
	};
}
