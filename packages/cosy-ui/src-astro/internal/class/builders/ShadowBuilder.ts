/**
 * ShadowBuilder - 阴影相关的类名构建
 *
 * 负责构建阴影相关的类名
 */

// 阴影类名映射表 - 确保 Tailwind 能够扫描到所有类名
const shadowMap = {
	sm: "cosy:shadow-sm",
	"": "cosy:shadow",
	md: "cosy:shadow-md",
	lg: "cosy:shadow-lg",
	xl: "cosy:shadow-xl",
	"2xl": "cosy:shadow-2xl",
	inner: "cosy:shadow-inner",
	none: "cosy:shadow-none",
} as const;

// 投影颜色类名映射表
const shadowColorMap = {
	// 基础色系
	"base-100": "cosy:shadow-base-100",
	"base-200": "cosy:shadow-base-200",
	"base-300": "cosy:shadow-base-300",
	"base-content": "cosy:shadow-base-content",

	// 主题色系
	primary: "cosy:shadow-primary",
	secondary: "cosy:shadow-secondary",
	accent: "cosy:shadow-accent",
	neutral: "cosy:shadow-neutral",

	// 状态色系
	info: "cosy:shadow-info",
	success: "cosy:shadow-success",
	warning: "cosy:shadow-warning",
	error: "cosy:shadow-error",

	// 基础颜色
	black: "cosy:shadow-black",
	white: "cosy:shadow-white",

	// 灰度色系
	"slate-500": "cosy:shadow-slate-500",
	"gray-500": "cosy:shadow-gray-500",
} as const;

// 导出类型定义
export type ShadowSize = keyof typeof shadowMap;
export type ShadowColor = keyof typeof shadowColorMap;

export class ShadowBuilder {
	private classes: string[] = [];

	/**
	 * 设置阴影大小
	 * @param size 阴影大小，不传参数则使用默认阴影
	 */
	shadow(size?: ShadowSize): this {
		const sizeKey = size ?? "";
		this.classes.push(shadowMap[sizeKey]);
		return this;
	}

	/**
	 * 设置阴影颜色
	 * @param color 阴影颜色值
	 */
	shadowColor(color: ShadowColor): this {
		this.classes.push(shadowColorMap[color]);
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
