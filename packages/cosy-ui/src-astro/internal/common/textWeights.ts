/**
 * 文本粗细类名映射（供 Text/Heading 等使用）
 */
export const textWeightClasses = {
	thin: "cosy:font-thin",
	light: "cosy:font-light",
	normal: "cosy:font-normal",
	medium: "cosy:font-medium",
	semibold: "cosy:font-semibold",
	bold: "cosy:font-bold",
	extrabold: "cosy:font-extrabold",
	black: "cosy:font-black",
} as const;

export type TextWeight = keyof typeof textWeightClasses;
