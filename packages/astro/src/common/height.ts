/**
 * 高度相关类型定义和类名映射
 * 包含高度属性类型和对应的 CSS 类名映射
 */

import type { Size } from "./size";

// 高度尺寸类型
export type HeightSize = Size | "screen" | "auto";

// 高度类名映射
export const heightClasses: Record<HeightSize, string> = {
	none: "",
	"3xs": "cosy:h-10",
	"2xs": "cosy:h-12",
	xs: "cosy:h-16",
	sm: "cosy:h-24",
	md: "cosy:h-32",
	lg: "cosy:h-40",
	xl: "cosy:h-48",
	"2xl": "cosy:h-56",
	"3xl": "cosy:h-64",
	"4xl": "cosy:h-72",
	"5xl": "cosy:h-80",
	"6xl": "cosy:h-96",
	screen: "cosy:h-screen",
	auto: "cosy:h-auto",
	full: "cosy:h-full",
} as const;
