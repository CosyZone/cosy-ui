/**
 * 通用边框配置
 * 包含各种边框尺寸的类型定义和对应的 CSS 类名映射
 * 适用于所有需要边框功能的组件
 */

// 边框尺寸类型
export type BorderSize = "none" | "sm" | "md" | "lg" | "xl";

// 边框类名映射
export const borderClasses: Record<BorderSize, string> = {
	none: "",
	sm: "cosy:border cosy:border-base-300",
	md: "cosy:border-2 cosy:border-base-300",
	lg: "cosy:border-4 cosy:border-base-300",
	xl: "cosy:border-8 cosy:border-base-300",
} as const;

// 边框颜色类名映射
export const borderColorClasses = {
	primary: "cosy:border-primary",
	secondary: "cosy:border-secondary",
	accent: "cosy:border-accent",
	neutral: "cosy:border-neutral",
	"base-100": "cosy:border-base-100",
	"base-200": "cosy:border-base-200",
	"base-300": "cosy:border-base-300",
	success: "cosy:border-success",
	warning: "cosy:border-warning",
	error: "cosy:border-error",
	info: "cosy:border-info",
	transparent: "cosy:border-transparent",
	none: "",
} as const;

// 透明度值
export const borderOpacityValues = [
	"10",
	"20",
	"30",
	"40",
	"50",
	"60",
	"70",
	"80",
	"90",
] as const;

// 边框颜色和透明度的完整类名映射
export const borderColorWithOpacityClasses = {
	// primary 边框色 + 透明度
	"primary/10": "cosy:border-primary/10",
	"primary/20": "cosy:border-primary/20",
	"primary/30": "cosy:border-primary/30",
	"primary/40": "cosy:border-primary/40",
	"primary/50": "cosy:border-primary/50",
	"primary/60": "cosy:border-primary/60",
	"primary/70": "cosy:border-primary/70",
	"primary/80": "cosy:border-primary/80",
	"primary/90": "cosy:border-primary/90",
	// secondary 边框色 + 透明度
	"secondary/10": "cosy:border-secondary/10",
	"secondary/20": "cosy:border-secondary/20",
	"secondary/30": "cosy:border-secondary/30",
	"secondary/40": "cosy:border-secondary/40",
	"secondary/50": "cosy:border-secondary/50",
	"secondary/60": "cosy:border-secondary/60",
	"secondary/70": "cosy:border-secondary/70",
	"secondary/80": "cosy:border-secondary/80",
	"secondary/90": "cosy:border-secondary/90",
	// accent 边框色 + 透明度
	"accent/10": "cosy:border-accent/10",
	"accent/20": "cosy:border-accent/20",
	"accent/30": "cosy:border-accent/30",
	"accent/40": "cosy:border-accent/40",
	"accent/50": "cosy:border-accent/50",
	"accent/60": "cosy:border-accent/60",
	"accent/70": "cosy:border-accent/70",
	"accent/80": "cosy:border-accent/80",
	"accent/90": "cosy:border-accent/90",
	// neutral 边框色 + 透明度
	"neutral/10": "cosy:border-neutral/10",
	"neutral/20": "cosy:border-neutral/20",
	"neutral/30": "cosy:border-neutral/30",
	"neutral/40": "cosy:border-neutral/40",
	"neutral/50": "cosy:border-neutral/50",
	"neutral/60": "cosy:border-neutral/60",
	"neutral/70": "cosy:border-neutral/70",
	"neutral/80": "cosy:border-neutral/80",
	"neutral/90": "cosy:border-neutral/90",
	// base-100 边框色 + 透明度
	"base-100/10": "cosy:border-base-100/10",
	"base-100/20": "cosy:border-base-100/20",
	"base-100/30": "cosy:border-base-100/30",
	"base-100/40": "cosy:border-base-100/40",
	"base-100/50": "cosy:border-base-100/50",
	"base-100/60": "cosy:border-base-100/60",
	"base-100/70": "cosy:border-base-100/70",
	"base-100/80": "cosy:border-base-100/80",
	"base-100/90": "cosy:border-base-100/90",
	// base-200 边框色 + 透明度
	"base-200/10": "cosy:border-base-200/10",
	"base-200/20": "cosy:border-base-200/20",
	"base-200/30": "cosy:border-base-200/30",
	"base-200/40": "cosy:border-base-200/40",
	"base-200/50": "cosy:border-base-200/50",
	"base-200/60": "cosy:border-base-200/60",
	"base-200/70": "cosy:border-base-200/70",
	"base-200/80": "cosy:border-base-200/80",
	"base-200/90": "cosy:border-base-200/90",
	// base-300 边框色 + 透明度
	"base-300/10": "cosy:border-base-300/10",
	"base-300/20": "cosy:border-base-300/20",
	"base-300/30": "cosy:border-base-300/30",
	"base-300/40": "cosy:border-base-300/40",
	"base-300/50": "cosy:border-base-300/50",
	"base-300/60": "cosy:border-base-300/60",
	"base-300/70": "cosy:border-base-300/70",
	"base-300/80": "cosy:border-base-300/80",
	"base-300/90": "cosy:border-base-300/90",
	// success 边框色 + 透明度
	"success/10": "cosy:border-success/10",
	"success/20": "cosy:border-success/20",
	"success/30": "cosy:border-success/30",
	"success/40": "cosy:border-success/40",
	"success/50": "cosy:border-success/50",
	"success/60": "cosy:border-success/60",
	"success/70": "cosy:border-success/70",
	"success/80": "cosy:border-success/80",
	"success/90": "cosy:border-success/90",
	// warning 边框色 + 透明度
	"warning/10": "cosy:border-warning/10",
	"warning/20": "cosy:border-warning/20",
	"warning/30": "cosy:border-warning/30",
	"warning/40": "cosy:border-warning/40",
	"warning/50": "cosy:border-warning/50",
	"warning/60": "cosy:border-warning/60",
	"warning/70": "cosy:border-warning/70",
	"warning/80": "cosy:border-warning/80",
	"warning/90": "cosy:border-warning/90",
	// error 边框色 + 透明度
	"error/10": "cosy:border-error/10",
	"error/20": "cosy:border-error/20",
	"error/30": "cosy:border-error/30",
	"error/40": "cosy:border-error/40",
	"error/50": "cosy:border-error/50",
	"error/60": "cosy:border-error/60",
	"error/70": "cosy:border-error/70",
	"error/80": "cosy:border-error/80",
	"error/90": "cosy:border-error/90",
	// info 边框色 + 透明度
	"info/10": "cosy:border-info/10",
	"info/20": "cosy:border-info/20",
	"info/30": "cosy:border-info/30",
	"info/40": "cosy:border-info/40",
	"info/50": "cosy:border-info/50",
	"info/60": "cosy:border-info/60",
	"info/70": "cosy:border-info/70",
	"info/80": "cosy:border-info/80",
	"info/90": "cosy:border-info/90",
} as const;

// 合并所有边框颜色类名
export const allBorderColorClasses = {
	...borderColorClasses,
	...borderColorWithOpacityClasses,
} as const;

// 边框颜色类型
export type BorderColor = keyof typeof allBorderColorClasses;

/**
 * 获取边框类名
 * @param border 边框尺寸类型
 * @returns 边框CSS类名
 */
export function getBorderClass(border?: BorderSize): string {
	if (!border) return "";
	return borderClasses[border] || "";
}

/**
 * 获取边框颜色类名
 * @param color 边框颜色类型
 * @returns 边框颜色CSS类名
 */
export function getBorderColorClass(color?: BorderColor): string {
	if (!color) return "";
	return allBorderColorClasses[color] || "";
}
