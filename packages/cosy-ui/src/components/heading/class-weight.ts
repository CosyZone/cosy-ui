import {
	textWeightClasses,
	type TextWeight,
} from "../../../src/common/textWeights";

/**
 * 计算 Heading 组件的字体粗细相关类名
 * @param level 标题级别
 * @param weight 字体粗细
 * @returns 字体粗细相关的类名
 */
export function getHeadingWeightClass(
	level: 1 | 2 | 3 | 4 | 5 | 6 = 2,
	weight?: TextWeight,
): string {
	// 默认字体粗细（当未指定 weight 时使用）
	const defaultWeightMap = {
		1: "cosy:font-bold",
		2: "cosy:font-semibold",
		3: "cosy:font-semibold",
		4: "cosy:font-medium",
		5: "cosy:font-medium",
		6: "cosy:font-medium",
	};

	// 如果指定了 weight，使用指定的值
	if (weight && weight in textWeightClasses) {
		return textWeightClasses[weight];
	}

	// 否则使用默认值
	return defaultWeightMap[level] || defaultWeightMap[2];
}
