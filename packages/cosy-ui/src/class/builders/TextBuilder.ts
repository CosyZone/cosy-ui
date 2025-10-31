/**
 * TextBuilder - 文本相关的类名构建
 *
 * 负责构建文本大小、粗细、对齐等文本相关的类名
 */

// 类名映射表 - 确保 Tailwind 能够扫描到所有类名
const textSizeMap = {
	xs: "cosy:text-xs",
	sm: "cosy:text-sm",
	md: "cosy:text-md",
	lg: "cosy:text-lg",
	xl: "cosy:text-xl",
	"2xl": "cosy:text-2xl",
	"3xl": "cosy:text-3xl",
} as const;

const textColorMap = {
	primary: "cosy:text-primary",
	secondary: "cosy:text-secondary",
	accent: "cosy:text-accent",
	neutral: "cosy:text-neutral",
	info: "cosy:text-info",
	success: "cosy:text-success",
	warning: "cosy:text-warning",
	error: "cosy:text-error",
	white: "cosy:text-white",
	black: "cosy:text-black",
} as const;

const textAlignMap = {
	left: "cosy:text-left",
	center: "cosy:text-center",
	right: "cosy:text-right",
	justify: "cosy:text-justify",
} as const;

const fontWeightMap = {
	thin: "cosy:font-thin",
	extralight: "cosy:font-extralight",
	light: "cosy:font-light",
	normal: "cosy:font-normal",
	medium: "cosy:font-medium",
	semibold: "cosy:font-semibold",
	bold: "cosy:font-bold",
	extrabold: "cosy:font-extrabold",
	black: "cosy:font-black",
} as const;

const lineHeightMap = {
	none: "cosy:leading-none",
	tight: "cosy:leading-tight",
	snug: "cosy:leading-snug",
	normal: "cosy:leading-normal",
	relaxed: "cosy:leading-relaxed",
	loose: "cosy:leading-loose",
} as const;

// 文本装饰映射表
const italicMap = {
	italic: "cosy:italic",
} as const;

const underlineMap = {
	underline: "cosy:underline",
} as const;

const noUnderlineMap = {
	"no-underline": "cosy:no-underline",
} as const;

const truncateMap = {
	truncate: "cosy:truncate",
} as const;

// 导出类型定义
export type TextSize = keyof typeof textSizeMap;
export type TextColor = keyof typeof textColorMap;
export type TextAlign = keyof typeof textAlignMap;
export type FontWeight = keyof typeof fontWeightMap;
export type LineHeight = keyof typeof lineHeightMap;

export class TextBuilder {
	private classes: string[] = [];

	/**
	 * 设置文本大小
	 * @param size 文本大小
	 */
	text(size: TextSize): this {
		this.classes.push(textSizeMap[size]);
		return this;
	}

	/**
	 * 设置文本加粗
	 */
	bold(): this {
		this.classes.push("cosy:font-bold");
		return this;
	}

	/**
	 * 设置文本颜色
	 * @param color 颜色值
	 */
	color(color: TextColor): this {
		this.classes.push(textColorMap[color]);
		return this;
	}

	/**
	 * 设置文本对齐
	 * @param align 对齐方式
	 */
	align(align: TextAlign): this {
		this.classes.push(textAlignMap[align]);
		return this;
	}

	/**
	 * 设置字体粗细
	 * @param weight 粗细值
	 */
	weight(weight: FontWeight): this {
		this.classes.push(fontWeightMap[weight]);
		return this;
	}

	/**
	 * 设置字体粗细为 medium
	 */
	medium(): this {
		this.classes.push(fontWeightMap.medium);
		return this;
	}

	/**
	 * 设置字体粗细为 semibold
	 */
	semibold(): this {
		this.classes.push(fontWeightMap.semibold);
		return this;
	}

	/**
	 * 设置行高
	 * @param height 行高值
	 */
	leading(height: LineHeight): this {
		this.classes.push(lineHeightMap[height]);
		return this;
	}

	/**
	 * 设置行高为 relaxed
	 */
	leadingRelaxed(): this {
		this.classes.push(lineHeightMap.relaxed);
		return this;
	}

	/**
	 * 设置文本为斜体
	 */
	italic(): this {
		this.classes.push(italicMap.italic);
		return this;
	}

	/**
	 * 设置文本下划线
	 */
	underline(): this {
		this.classes.push(underlineMap.underline);
		return this;
	}

	/**
	 * 移除文本下划线
	 */
	noUnderline(): this {
		this.classes.push(noUnderlineMap["no-underline"]);
		return this;
	}

	/**
	 * 设置文本截断（显示省略号）
	 */
	truncate(): this {
		this.classes.push(truncateMap.truncate);
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
