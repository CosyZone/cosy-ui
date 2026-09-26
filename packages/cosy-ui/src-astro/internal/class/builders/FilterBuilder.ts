/**
 * FilterBuilder - 滤镜相关的类名构建
 *
 * 负责构建滤镜相关的类名，包括背景模糊、模糊等效果
 */

// 背景模糊类名映射表 - 确保 Tailwind 能够扫描到所有类名
const backdropBlurMap = {
	none: "cosy:backdrop-blur-none",
	sm: "cosy:backdrop-blur-sm",
	"": "cosy:backdrop-blur",
	md: "cosy:backdrop-blur-md",
	lg: "cosy:backdrop-blur-lg",
	xl: "cosy:backdrop-blur-xl",
	"2xl": "cosy:backdrop-blur-2xl",
	"3xl": "cosy:backdrop-blur-3xl",
} as const;

// 模糊类名映射表
const blurMap = {
	none: "cosy:blur-none",
	sm: "cosy:blur-sm",
	"": "cosy:blur",
	md: "cosy:blur-md",
	lg: "cosy:blur-lg",
	xl: "cosy:blur-xl",
	"2xl": "cosy:blur-2xl",
	"3xl": "cosy:blur-3xl",
} as const;

// 背景饱和度类名映射表
const backdropSaturateMap = {
	"0": "cosy:backdrop-saturate-0",
	"50": "cosy:backdrop-saturate-50",
	"100": "cosy:backdrop-saturate-100",
	"150": "cosy:backdrop-saturate-150",
	"200": "cosy:backdrop-saturate-200",
} as const;

// 背景亮度类名映射表
const backdropBrightnessMap = {
	"0": "cosy:backdrop-brightness-0",
	"50": "cosy:backdrop-brightness-50",
	"75": "cosy:backdrop-brightness-75",
	"90": "cosy:backdrop-brightness-90",
	"95": "cosy:backdrop-brightness-95",
	"100": "cosy:backdrop-brightness-100",
	"105": "cosy:backdrop-brightness-105",
	"110": "cosy:backdrop-brightness-110",
	"125": "cosy:backdrop-brightness-125",
	"150": "cosy:backdrop-brightness-150",
	"200": "cosy:backdrop-brightness-200",
} as const;

// 导出类型定义
export type BackdropBlurSize = keyof typeof backdropBlurMap;
export type BlurSize = keyof typeof blurMap;
export type BackdropSaturateValue = keyof typeof backdropSaturateMap;
export type BackdropBrightnessValue = keyof typeof backdropBrightnessMap;

export class FilterBuilder {
	private classes: string[] = [];

	/**
	 * 设置背景模糊
	 * @param size 模糊大小，不传参数则使用默认模糊
	 */
	backdropBlur(size?: BackdropBlurSize): this {
		const sizeKey = size ?? "";
		this.classes.push(backdropBlurMap[sizeKey]);
		return this;
	}

	/**
	 * 设置模糊
	 * @param size 模糊大小，不传参数则使用默认模糊
	 */
	blur(size?: BlurSize): this {
		const sizeKey = size ?? "";
		this.classes.push(blurMap[sizeKey]);
		return this;
	}

	/**
	 * 设置背景饱和度
	 * @param value 饱和度值
	 */
	backdropSaturate(value: BackdropSaturateValue): this {
		this.classes.push(backdropSaturateMap[value]);
		return this;
	}

	/**
	 * 设置背景亮度
	 * @param value 亮度值
	 */
	backdropBrightness(value: BackdropBrightnessValue): this {
		this.classes.push(backdropBrightnessMap[value]);
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
