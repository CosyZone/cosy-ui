/**
 * 宽度相关类型定义和类名映射
 */

import type { Size } from "./size";

// 宽度尺寸类型
export type WidthSize = Size;

// 宽度类名映射
export const widthClasses: Record<WidthSize, string> = {
	none: "",
	"3xs": "",
	"2xs": "",
	xs: "cosy:max-w-xs",
	sm: "cosy:max-w-sm",
	md: "cosy:max-w-2xl",
	lg: "cosy:max-w-4xl",
	xl: "cosy:max-w-6xl",
	"2xl": "cosy:max-w-7xl",
	"3xl": "cosy:max-w-8xl",
	"4xl": "cosy:max-w-9xl",
	"5xl": "cosy:max-w-10xl",
	"6xl": "cosy:max-w-11xl",
	full: "cosy:w-full",
} as const;
