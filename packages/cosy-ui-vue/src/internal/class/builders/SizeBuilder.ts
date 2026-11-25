/**
 * SizeBuilder - 尺寸相关的类名构建
 *
 * 负责构建 width、height 等尺寸相关的类名
 */

// 类名映射表 - 确保 Tailwind 能够扫描到所有类名
const widthMap = {
	auto: "cosy:w-auto",
	full: "cosy:w-full",
	fit: "cosy:w-fit",
	0: "cosy:w-0",
	1: "cosy:w-1",
	2: "cosy:w-2",
	3: "cosy:w-3",
	4: "cosy:w-4",
	5: "cosy:w-5",
	6: "cosy:w-6",
	8: "cosy:w-8",
	10: "cosy:w-10",
	12: "cosy:w-12",
	16: "cosy:w-16",
	20: "cosy:w-20",
	24: "cosy:w-24",
	32: "cosy:w-32",
	48: "cosy:w-48",
	64: "cosy:w-64",
} as const;

const heightMap = {
	auto: "cosy:h-auto",
	full: "cosy:h-full",
	fit: "cosy:h-fit",
	0: "cosy:h-0",
	1: "cosy:h-1",
	2: "cosy:h-2",
	3: "cosy:h-3",
	4: "cosy:h-4",
	5: "cosy:h-5",
	6: "cosy:h-6",
	8: "cosy:h-8",
	10: "cosy:h-10",
	12: "cosy:h-12",
	16: "cosy:h-16",
	20: "cosy:h-20",
	24: "cosy:h-24",
	32: "cosy:h-32",
	48: "cosy:h-48",
	64: "cosy:h-64",
} as const;

const minWidthMap = {
	0: "cosy:min-w-0",
	full: "cosy:min-w-full",
	20: "cosy:min-w-20",
	40: "cosy:min-w-40",
	60: "cosy:min-w-60",
	80: "cosy:min-w-80",
} as const;

const minHeightMap = {
	0: "cosy:min-h-0",
	full: "cosy:min-h-full",
	screen: "cosy:min-h-screen",
	10: "cosy:min-h-10",
	20: "cosy:min-h-20",
	40: "cosy:min-h-40",
	60: "cosy:min-h-60",
} as const;

const maxWidthMap = {
	none: "cosy:max-w-none",
	full: "cosy:max-w-full",
	sm: "cosy:max-w-sm",
	md: "cosy:max-w-md",
	lg: "cosy:max-w-lg",
	xl: "cosy:max-w-xl",
	"2xl": "cosy:max-w-2xl",
	20: "cosy:max-w-20",
	40: "cosy:max-w-40",
	60: "cosy:max-w-60",
	80: "cosy:max-w-80",
	100: "cosy:max-w-100",
} as const;

const maxHeightMap = {
	none: "cosy:max-h-none",
	full: "cosy:max-h-full",
	20: "cosy:max-h-20",
	40: "cosy:max-h-40",
	60: "cosy:max-h-60",
	80: "cosy:max-h-80",
	100: "cosy:max-h-100",
} as const;

// 导出类型定义
export type WidthSize = keyof typeof widthMap;
export type HeightSize = keyof typeof heightMap;
export type MinWidthSize = keyof typeof minWidthMap;
export type MinHeightSize = keyof typeof minHeightMap;
export type MaxWidthSize = keyof typeof maxWidthMap;
export type MaxHeightSize = keyof typeof maxHeightMap;

export class SizeBuilder {
	private classes: string[] = [];

	/**
	 * 设置宽度
	 * @param size 宽度值
	 */
	w(size: WidthSize): this {
		this.classes.push(widthMap[size]);
		return this;
	}

	/**
	 * 设置高度
	 * @param size 高度值
	 */
	h(size: HeightSize): this {
		this.classes.push(heightMap[size]);
		return this;
	}

	/**
	 * 设置最小宽度
	 * @param size 最小宽度值
	 */
	minW(size: MinWidthSize): this {
		this.classes.push(minWidthMap[size]);
		return this;
	}

	/**
	 * 设置最小高度
	 * @param size 最小高度值
	 */
	minH(size: MinHeightSize): this {
		this.classes.push(minHeightMap[size]);
		return this;
	}

	/**
	 * 设置最大宽度
	 * @param size 最大宽度值
	 */
	maxW(size: MaxWidthSize): this {
		this.classes.push(maxWidthMap[size]);
		return this;
	}

	/**
	 * 设置最大高度
	 * @param size 最大高度值
	 */
	maxH(size: MaxHeightSize): this {
		this.classes.push(maxHeightMap[size]);
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
