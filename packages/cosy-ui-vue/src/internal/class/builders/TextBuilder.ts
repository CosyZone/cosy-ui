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
	"4xl": "cosy:text-4xl",
	"5xl": "cosy:text-5xl",
	"6xl": "cosy:text-6xl",
	"7xl": "cosy:text-7xl",
	"8xl": "cosy:text-8xl",
	"9xl": "cosy:text-9xl",
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
	"base-content": "cosy:text-base-content",
} as const;

// 带透明度的文本颜色映射表
const textColorWithOpacityMap = {
	"base-content/40": "cosy:text-base-content/40",
	"base-content/50": "cosy:text-base-content/50",
	"base-content/60": "cosy:text-base-content/60",
	"base-content/70": "cosy:text-base-content/70",
	"base-content/80": "cosy:text-base-content/80",
	"base-content/90": "cosy:text-base-content/90",
} as const;

// 合并的文本颜色类型
export type TextColorWithOpacity =
	| keyof typeof textColorMap
	| keyof typeof textColorWithOpacityMap;

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
	 * @param color 颜色值，支持带透明度（如 "base-content/60"）
	 */
	color(color: TextColorWithOpacity): this {
		if (color in textColorMap) {
			this.classes.push(textColorMap[color as TextColor]);
		} else if (color in textColorWithOpacityMap) {
			this.classes.push(
				textColorWithOpacityMap[color as keyof typeof textColorWithOpacityMap],
			);
		}
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
