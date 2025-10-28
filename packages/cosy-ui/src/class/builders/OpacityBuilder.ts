/**
 * OpacityBuilder - 透明度相关的类名构建
 *
 * 负责构建透明度相关的类名
 */

// 类名映射表 - 确保 Tailwind 能够扫描到所有类名
const opacityMap = {
	0: "cosy:opacity-0",
	5: "cosy:opacity-5",
	10: "cosy:opacity-10",
	20: "cosy:opacity-20",
	25: "cosy:opacity-25",
	30: "cosy:opacity-30",
	40: "cosy:opacity-40",
	50: "cosy:opacity-50",
	60: "cosy:opacity-60",
	70: "cosy:opacity-70",
	75: "cosy:opacity-75",
	80: "cosy:opacity-80",
	90: "cosy:opacity-90",
	95: "cosy:opacity-95",
	100: "cosy:opacity-100",
} as const;

const bgOpacityMap = {
	0: "cosy:bg-opacity-0",
	5: "cosy:bg-opacity-5",
	10: "cosy:bg-opacity-10",
	20: "cosy:bg-opacity-20",
	25: "cosy:bg-opacity-25",
	30: "cosy:bg-opacity-30",
	40: "cosy:bg-opacity-40",
	50: "cosy:bg-opacity-50",
	60: "cosy:bg-opacity-60",
	70: "cosy:bg-opacity-70",
	75: "cosy:bg-opacity-75",
	80: "cosy:bg-opacity-80",
	90: "cosy:bg-opacity-90",
	95: "cosy:bg-opacity-95",
	100: "cosy:bg-opacity-100",
} as const;

const textOpacityMap = {
	0: "cosy:text-opacity-0",
	5: "cosy:text-opacity-5",
	10: "cosy:text-opacity-10",
	20: "cosy:text-opacity-20",
	25: "cosy:text-opacity-25",
	30: "cosy:text-opacity-30",
	40: "cosy:text-opacity-40",
	50: "cosy:text-opacity-50",
	60: "cosy:text-opacity-60",
	70: "cosy:text-opacity-70",
	75: "cosy:text-opacity-75",
	80: "cosy:text-opacity-80",
	90: "cosy:text-opacity-90",
	95: "cosy:text-opacity-95",
	100: "cosy:text-opacity-100",
} as const;

// 导出类型定义
export type OpacityValue = keyof typeof opacityMap;
export type BgOpacityValue = keyof typeof bgOpacityMap;
export type TextOpacityValue = keyof typeof textOpacityMap;

export class OpacityBuilder {
	private classes: string[] = [];

	/**
	 * 设置透明度
	 * @param value 透明度值
	 */
	opacity(value: OpacityValue): this {
		this.classes.push(opacityMap[value]);
		return this;
	}

	/**
	 * 设置背景透明度
	 * @param value 透明度值
	 */
	bgOpacity(value: BgOpacityValue): this {
		this.classes.push(bgOpacityMap[value]);
		return this;
	}

	/**
	 * 设置文本透明度
	 * @param value 透明度值
	 */
	textOpacity(value: TextOpacityValue): this {
		this.classes.push(textOpacityMap[value]);
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
