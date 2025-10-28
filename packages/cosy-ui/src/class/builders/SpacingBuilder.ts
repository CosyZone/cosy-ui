/**
 * SpacingBuilder - 间距相关的类名构建
 *
 * 负责构建 gap、padding、margin 等间距相关的类名
 */

// 类名映射表 - 确保 Tailwind 能够扫描到所有类名
const gapMap = {
	0: "cosy:gap-0",
	1: "cosy:gap-1",
	2: "cosy:gap-2",
	3: "cosy:gap-3",
	4: "cosy:gap-4",
	5: "cosy:gap-5",
	6: "cosy:gap-6",
	8: "cosy:gap-8",
	10: "cosy:gap-10",
	12: "cosy:gap-12",
	16: "cosy:gap-16",
} as const;

const paddingMap = {
	0: "cosy:p-0",
	1: "cosy:p-1",
	2: "cosy:p-2",
	3: "cosy:p-3",
	4: "cosy:p-4",
	5: "cosy:p-5",
	6: "cosy:p-6",
	8: "cosy:p-8",
	10: "cosy:p-10",
	12: "cosy:p-12",
	16: "cosy:p-16",
} as const;

const marginMap = {
	0: "cosy:m-0",
	1: "cosy:m-1",
	2: "cosy:m-2",
	3: "cosy:m-3",
	4: "cosy:m-4",
	5: "cosy:m-5",
	6: "cosy:m-6",
	8: "cosy:m-8",
	10: "cosy:m-10",
	12: "cosy:m-12",
	16: "cosy:m-16",
} as const;

// 导出类型定义
export type GapSize = keyof typeof gapMap;
export type PaddingSize = keyof typeof paddingMap;
export type MarginSize = keyof typeof marginMap;

export class SpacingBuilder {
	private classes: string[] = [];

	/**
	 * 设置间距
	 * @param size 间距大小
	 */
	gap(size: GapSize): this {
		this.classes.push(gapMap[size]);
		return this;
	}

	/**
	 * 设置内边距
	 * @param size 内边距大小
	 */
	padding(size: PaddingSize): this {
		this.classes.push(paddingMap[size]);
		return this;
	}

	/**
	 * 设置外边距
	 * @param size 外边距大小
	 */
	margin(size: MarginSize): this {
		this.classes.push(marginMap[size]);
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
