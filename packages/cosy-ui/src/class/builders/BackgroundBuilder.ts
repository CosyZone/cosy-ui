/**
 * BackgroundBuilder - 背景相关的类名构建
 *
 * 负责构建背景相关的类名，包括背景色等
 */

// 背景色类名映射表 - 确保 Tailwind 能够扫描到所有类名
const backgroundColorMap = {
	// 基础色系
	"base-100": "cosy:bg-base-100",
	"base-200": "cosy:bg-base-200",
	"base-300": "cosy:bg-base-300",
	"base-content": "cosy:bg-base-content",

	// 主题色系
	primary: "cosy:bg-primary",
	"primary-content": "cosy:bg-primary-content",
	secondary: "cosy:bg-secondary",
	"secondary-content": "cosy:bg-secondary-content",
	accent: "cosy:bg-accent",
	"accent-content": "cosy:bg-accent-content",
	neutral: "cosy:bg-neutral",
	"neutral-content": "cosy:bg-neutral-content",

	// 状态色系
	info: "cosy:bg-info",
	"info-content": "cosy:bg-info-content",
	success: "cosy:bg-success",
	"success-content": "cosy:bg-success-content",
	warning: "cosy:bg-warning",
	"warning-content": "cosy:bg-warning-content",
	error: "cosy:bg-error",
	"error-content": "cosy:bg-error-content",

	// 基础颜色
	transparent: "cosy:bg-transparent",
	current: "cosy:bg-current",
	white: "cosy:bg-white",
	black: "cosy:bg-black",

	// 灰度色系
	"slate-50": "cosy:bg-slate-50",
	"slate-100": "cosy:bg-slate-100",
	"slate-200": "cosy:bg-slate-200",
	"slate-300": "cosy:bg-slate-300",
	"slate-400": "cosy:bg-slate-400",
	"slate-500": "cosy:bg-slate-500",
	"slate-600": "cosy:bg-slate-600",
	"slate-700": "cosy:bg-slate-700",
	"slate-800": "cosy:bg-slate-800",
	"slate-900": "cosy:bg-slate-900",

	"gray-50": "cosy:bg-gray-50",
	"gray-100": "cosy:bg-gray-100",
	"gray-200": "cosy:bg-gray-200",
	"gray-300": "cosy:bg-gray-300",
	"gray-400": "cosy:bg-gray-400",
	"gray-500": "cosy:bg-gray-500",
	"gray-600": "cosy:bg-gray-600",
	"gray-700": "cosy:bg-gray-700",
	"gray-800": "cosy:bg-gray-800",
	"gray-900": "cosy:bg-gray-900",
} as const;

// 导出类型定义
export type BackgroundColor = keyof typeof backgroundColorMap;

export class BackgroundBuilder {
	private classes: string[] = [];

	/**
	 * 设置背景色
	 * @param color 背景色值
	 */
	bg(color: BackgroundColor): this {
		this.classes.push(backgroundColorMap[color]);
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
