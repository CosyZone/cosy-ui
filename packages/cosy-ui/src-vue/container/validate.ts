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

/**
 * 校验容器尺寸相关配置
 * @param props - Container 组件属性
 * @returns 校验失败的错误消息数组
 */
export function validateSizing(props: Record<string, unknown>): string[] {
	const messages: string[] = [];

	// 检查属性是否被显式设置（不为 undefined 且不为默认值）
	const isAspectRatioSet =
		Object.hasOwn(props, "aspectRatio") && props.aspectRatio !== undefined;

	const isHeightSet =
		Object.hasOwn(props, "height") &&
		props.height !== undefined &&
		props.height !== "none";

	const isWidthSet =
		Object.hasOwn(props, "width") &&
		props.width !== undefined &&
		props.width !== "none";

	// 规则1：aspectRatio、width、height 不能同时设置
	if (isAspectRatioSet && isHeightSet && isWidthSet) {
		messages.push(
			"不能同时设置 aspectRatio、width 与 height。可两两组合，但不能同时设置3个。",
		);
	}

	// 规则2：启用 fit 时必须设置 aspectRatio
	const fit = props.fit as string;
	if (fit && fit !== "none" && !isAspectRatioSet) {
		messages.push("参数不完整：启用了 fit，但未设置 aspectRatio。");
	}

	// 规则3：警告可能的高度为0情况
	// const padding = props.padding as string;
	// if (padding === "none" && !isAspectRatioSet && !isHeightSet && (!fit || fit === "none")) {
	//     messages.push(
	//         '可见性风险：未设置 height/fit/aspectRatio 且 padding="none"，可能导致容器高度为 0。',
	//     );
	// }

	return messages;
}

/**
 * 校验 Container 组件配置
 * @param props - Container 组件的原始属性
 * @returns 所有校验失败的错误消息数组
 */
export function validateContainer(props: Record<string, unknown>): string[] {
	const messages: string[] = [];

	// 1. 内边距校验
	const paddingResult = validatePaddingConflict(
		props.px as string,
		props.pl as string,
		props.pr as string,
		props.py as string,
		props.pt as string,
		props.pb as string,
	);

	if (paddingResult.hasConflict && paddingResult.message) {
		messages.push(paddingResult.message);
	}

	// 2. 尺寸相关校验
	messages.push(...validateSizing(props));

	return messages;
}
