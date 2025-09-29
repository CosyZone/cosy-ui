/**
 * 内容适配模式相关类型定义和类名映射
 * 包含各种内容适配模式的类型定义和对应的 CSS 类名映射
 */

// 内容适配模式类型
export type FitMode = "none" | "contain" | "cover";

// 内容适配模式类名映射
export const fitModeClasses: Record<FitMode, string> = {
	none: "",
	contain: "cosy:object-contain",
	cover: "cosy:object-cover",
} as const;
