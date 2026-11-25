/**
 * BorderBuilder - 边框相关的类名构建
 *
 * 负责构建边框相关的类名，包括边框样式、边框颜色、圆角等
 */

// 边框宽度类名映射表
const borderWidthMap = {
	"": "cosy:border",
	"0": "cosy:border-0",
	"2": "cosy:border-2",
	"4": "cosy:border-4",
	"8": "cosy:border-8",
} as const;

// 边框颜色类名映射表 - 确保 Tailwind 能够扫描到所有类名
const borderColorMap = {
	// 基础色系
	"base-100": "cosy:border-base-100",
	"base-200": "cosy:border-base-200",
	"base-300": "cosy:border-base-300",
	"base-content": "cosy:border-base-content",

	// 主题色系
	primary: "cosy:border-primary",
	"primary-content": "cosy:border-primary-content",
	secondary: "cosy:border-secondary",
	"secondary-content": "cosy:border-secondary-content",
	accent: "cosy:border-accent",
	"accent-content": "cosy:border-accent-content",
	neutral: "cosy:border-neutral",
	"neutral-content": "cosy:border-neutral-content",

	// 状态色系
	info: "cosy:border-info",
	"info-content": "cosy:border-info-content",
	success: "cosy:border-success",
	"success-content": "cosy:border-success-content",
	warning: "cosy:border-warning",
	"warning-content": "cosy:border-warning-content",
	error: "cosy:border-error",
	"error-content": "cosy:border-error-content",

	// 基础颜色
	transparent: "cosy:border-transparent",
	current: "cosy:border-current",
	white: "cosy:border-white",
	black: "cosy:border-black",

	// 灰度色系
	"slate-50": "cosy:border-slate-50",
	"slate-100": "cosy:border-slate-100",
	"slate-200": "cosy:border-slate-200",
	"slate-300": "cosy:border-slate-300",
	"slate-400": "cosy:border-slate-400",
	"slate-500": "cosy:border-slate-500",
	"slate-600": "cosy:border-slate-600",
	"slate-700": "cosy:border-slate-700",
	"slate-800": "cosy:border-slate-800",
	"slate-900": "cosy:border-slate-900",

	"gray-50": "cosy:border-gray-50",
	"gray-100": "cosy:border-gray-100",
	"gray-200": "cosy:border-gray-200",
	"gray-300": "cosy:border-gray-300",
	"gray-400": "cosy:border-gray-400",
	"gray-500": "cosy:border-gray-500",
	"gray-600": "cosy:border-gray-600",
	"gray-700": "cosy:border-gray-700",
	"gray-800": "cosy:border-gray-800",
	"gray-900": "cosy:border-gray-900",
} as const;

// 圆角类名映射表
const roundedMap = {
	none: "cosy:rounded-none",
	sm: "cosy:rounded-sm",
	"": "cosy:rounded",
	md: "cosy:rounded-md",
	lg: "cosy:rounded-lg",
	xl: "cosy:rounded-xl",
	"2xl": "cosy:rounded-2xl",
	"3xl": "cosy:rounded-3xl",
	full: "cosy:rounded-full",
} as const;

// 方向性圆角类名映射表
const roundedTopMap = {
	none: "cosy:rounded-t-none",
	sm: "cosy:rounded-t-sm",
	"": "cosy:rounded-t",
	md: "cosy:rounded-t-md",
	lg: "cosy:rounded-t-lg",
	xl: "cosy:rounded-t-xl",
	"2xl": "cosy:rounded-t-2xl",
	"3xl": "cosy:rounded-t-3xl",
	full: "cosy:rounded-t-full",
} as const;

const roundedBottomMap = {
	none: "cosy:rounded-b-none",
	sm: "cosy:rounded-b-sm",
	"": "cosy:rounded-b",
	md: "cosy:rounded-b-md",
	lg: "cosy:rounded-b-lg",
	xl: "cosy:rounded-b-xl",
	"2xl": "cosy:rounded-b-2xl",
	"3xl": "cosy:rounded-b-3xl",
	full: "cosy:rounded-b-full",
} as const;

const roundedLeftMap = {
	none: "cosy:rounded-l-none",
	sm: "cosy:rounded-l-sm",
	"": "cosy:rounded-l",
	md: "cosy:rounded-l-md",
	lg: "cosy:rounded-l-lg",
	xl: "cosy:rounded-l-xl",
	"2xl": "cosy:rounded-l-2xl",
	"3xl": "cosy:rounded-l-3xl",
	full: "cosy:rounded-l-full",
} as const;

const roundedRightMap = {
	none: "cosy:rounded-r-none",
	sm: "cosy:rounded-r-sm",
	"": "cosy:rounded-r",
	md: "cosy:rounded-r-md",
	lg: "cosy:rounded-r-lg",
	xl: "cosy:rounded-r-xl",
	"2xl": "cosy:rounded-r-2xl",
	"3xl": "cosy:rounded-r-3xl",
	full: "cosy:rounded-r-full",
} as const;

// 导出类型定义
export type BorderWidth = keyof typeof borderWidthMap;
export type BorderColor = keyof typeof borderColorMap;
export type RoundedSize = keyof typeof roundedMap;
export type RoundedTopSize = keyof typeof roundedTopMap;
export type RoundedBottomSize = keyof typeof roundedBottomMap;
export type RoundedLeftSize = keyof typeof roundedLeftMap;
export type RoundedRightSize = keyof typeof roundedRightMap;

export class BorderBuilder {
	private classes: string[] = [];

	/**
	 * 设置边框宽度
	 * @param width 边框宽度值，不传参数则使用默认边框
	 */
	border(width?: BorderWidth): this {
		const widthKey = width ?? "";
		this.classes.push(borderWidthMap[widthKey]);
		return this;
	}

	/**
	 * 设置边框颜色
	 * @param color 边框颜色值
	 */
	borderColor(color: BorderColor): this {
		this.classes.push(borderColorMap[color]);
		return this;
	}

	/**
	 * 设置圆角
	 * @param size 圆角大小，不传参数则使用默认圆角
	 */
	rounded(size?: RoundedSize): this {
		const sizeKey = size ?? "";
		this.classes.push(roundedMap[sizeKey]);
		return this;
	}

	/**
	 * 设置顶部圆角
	 * @param size 圆角大小，不传参数则使用默认圆角
	 */
	roundedTop(size?: RoundedTopSize): this {
		const sizeKey = size ?? "";
		this.classes.push(roundedTopMap[sizeKey]);
		return this;
	}

	/**
	 * 设置底部圆角
	 * @param size 圆角大小，不传参数则使用默认圆角
	 */
	roundedBottom(size?: RoundedBottomSize): this {
		const sizeKey = size ?? "";
		this.classes.push(roundedBottomMap[sizeKey]);
		return this;
	}

	/**
	 * 设置左侧圆角
	 * @param size 圆角大小，不传参数则使用默认圆角
	 */
	roundedLeft(size?: RoundedLeftSize): this {
		const sizeKey = size ?? "";
		this.classes.push(roundedLeftMap[sizeKey]);
		return this;
	}

	/**
	 * 设置右侧圆角
	 * @param size 圆角大小，不传参数则使用默认圆角
	 */
	roundedRight(size?: RoundedRightSize): this {
		const sizeKey = size ?? "";
		this.classes.push(roundedRightMap[sizeKey]);
		return this;
	}

	/**
	 * 获取构建的类名数组
	 */
	getClasses(): string[] {
		return this.classes;
	}

	/**
	 * 清空类名
	 */
	clear(): void {
		this.classes = [];
	}
}
