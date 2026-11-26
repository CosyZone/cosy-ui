/**
 * 文本对齐类名映射
 */
export const textAlignClasses = {
	left: "cosy:text-left",
	center: "cosy:text-center",
	right: "cosy:text-right",
	justify: "cosy:text-justify",
} as const;

export type TextAlign = keyof typeof textAlignClasses;
