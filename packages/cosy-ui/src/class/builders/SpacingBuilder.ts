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
	auto: "cosy:m-auto",
} as const;

const marginXMap = {
	0: "cosy:mx-0",
	1: "cosy:mx-1",
	2: "cosy:mx-2",
	3: "cosy:mx-3",
	4: "cosy:mx-4",
	5: "cosy:mx-5",
	6: "cosy:mx-6",
	8: "cosy:mx-8",
	10: "cosy:mx-10",
	12: "cosy:mx-12",
	16: "cosy:mx-16",
	auto: "cosy:mx-auto",
} as const;

const marginYMap = {
	0: "cosy:my-0",
	1: "cosy:my-1",
	2: "cosy:my-2",
	3: "cosy:my-3",
	4: "cosy:my-4",
	5: "cosy:my-5",
	6: "cosy:my-6",
	8: "cosy:my-8",
	10: "cosy:my-10",
	12: "cosy:my-12",
	16: "cosy:my-16",
	auto: "cosy:my-auto",
} as const;

// 单侧外边距映射表
const marginTopMap = {
	0: "cosy:mt-0",
	1: "cosy:mt-1",
	2: "cosy:mt-2",
	3: "cosy:mt-3",
	4: "cosy:mt-4",
	5: "cosy:mt-5",
	6: "cosy:mt-6",
	8: "cosy:mt-8",
	10: "cosy:mt-10",
	12: "cosy:mt-12",
	16: "cosy:mt-16",
	auto: "cosy:mt-auto",
} as const;

const marginBottomMap = {
	0: "cosy:mb-0",
	1: "cosy:mb-1",
	2: "cosy:mb-2",
	3: "cosy:mb-3",
	4: "cosy:mb-4",
	5: "cosy:mb-5",
	6: "cosy:mb-6",
	8: "cosy:mb-8",
	10: "cosy:mb-10",
	12: "cosy:mb-12",
	16: "cosy:mb-16",
	auto: "cosy:mb-auto",
} as const;

const marginLeftMap = {
	0: "cosy:ml-0",
	1: "cosy:ml-1",
	2: "cosy:ml-2",
	3: "cosy:ml-3",
	4: "cosy:ml-4",
	5: "cosy:ml-5",
	6: "cosy:ml-6",
	8: "cosy:ml-8",
	10: "cosy:ml-10",
	12: "cosy:ml-12",
	16: "cosy:ml-16",
	auto: "cosy:ml-auto",
} as const;

const marginRightMap = {
	0: "cosy:mr-0",
	1: "cosy:mr-1",
	2: "cosy:mr-2",
	3: "cosy:mr-3",
	4: "cosy:mr-4",
	5: "cosy:mr-5",
	6: "cosy:mr-6",
	8: "cosy:mr-8",
	10: "cosy:mr-10",
	12: "cosy:mr-12",
	16: "cosy:mr-16",
	auto: "cosy:mr-auto",
} as const;

const paddingXMap = {
	0: "cosy:px-0",
	1: "cosy:px-1",
	2: "cosy:px-2",
	3: "cosy:px-3",
	4: "cosy:px-4",
	5: "cosy:px-5",
	6: "cosy:px-6",
	8: "cosy:px-8",
	10: "cosy:px-10",
	12: "cosy:px-12",
	16: "cosy:px-16",
} as const;

const paddingYMap = {
	0: "cosy:py-0",
	1: "cosy:py-1",
	2: "cosy:py-2",
	3: "cosy:py-3",
	4: "cosy:py-4",
	5: "cosy:py-5",
	6: "cosy:py-6",
	8: "cosy:py-8",
	10: "cosy:py-10",
	12: "cosy:py-12",
	16: "cosy:py-16",
} as const;

// 单侧内边距映射表
const paddingTopMap = {
	0: "cosy:pt-0",
	1: "cosy:pt-1",
	2: "cosy:pt-2",
	3: "cosy:pt-3",
	4: "cosy:pt-4",
	5: "cosy:pt-5",
	6: "cosy:pt-6",
	8: "cosy:pt-8",
	10: "cosy:pt-10",
	12: "cosy:pt-12",
	16: "cosy:pt-16",
} as const;

const paddingBottomMap = {
	0: "cosy:pb-0",
	1: "cosy:pb-1",
	2: "cosy:pb-2",
	3: "cosy:pb-3",
	4: "cosy:pb-4",
	5: "cosy:pb-5",
	6: "cosy:pb-6",
	8: "cosy:pb-8",
	10: "cosy:pb-10",
	12: "cosy:pb-12",
	16: "cosy:pb-16",
} as const;

const paddingLeftMap = {
	0: "cosy:pl-0",
	1: "cosy:pl-1",
	2: "cosy:pl-2",
	3: "cosy:pl-3",
	4: "cosy:pl-4",
	5: "cosy:pl-5",
	6: "cosy:pl-6",
	8: "cosy:pl-8",
	10: "cosy:pl-10",
	12: "cosy:pl-12",
	16: "cosy:pl-16",
} as const;

const paddingRightMap = {
	0: "cosy:pr-0",
	1: "cosy:pr-1",
	2: "cosy:pr-2",
	3: "cosy:pr-3",
	4: "cosy:pr-4",
	5: "cosy:pr-5",
	6: "cosy:pr-6",
	8: "cosy:pr-8",
	10: "cosy:pr-10",
	12: "cosy:pr-12",
	16: "cosy:pr-16",
} as const;

// Space 映射表（子元素间距）
const spaceXMap = {
	0: "cosy:space-x-0",
	1: "cosy:space-x-1",
	2: "cosy:space-x-2",
	3: "cosy:space-x-3",
	4: "cosy:space-x-4",
	5: "cosy:space-x-5",
	6: "cosy:space-x-6",
	8: "cosy:space-x-8",
	10: "cosy:space-x-10",
	12: "cosy:space-x-12",
	16: "cosy:space-x-16",
} as const;

const spaceYMap = {
	0: "cosy:space-y-0",
	1: "cosy:space-y-1",
	2: "cosy:space-y-2",
	3: "cosy:space-y-3",
	4: "cosy:space-y-4",
	5: "cosy:space-y-5",
	6: "cosy:space-y-6",
	8: "cosy:space-y-8",
	10: "cosy:space-y-10",
	12: "cosy:space-y-12",
	16: "cosy:space-y-16",
} as const;

// 导出类型定义
export type GapSize = keyof typeof gapMap;
export type PaddingSize = keyof typeof paddingMap;
export type MarginSize = keyof typeof marginMap;
export type MarginXSize = keyof typeof marginXMap;
export type MarginYSize = keyof typeof marginYMap;
export type MarginTopSize = keyof typeof marginTopMap;
export type MarginBottomSize = keyof typeof marginBottomMap;
export type MarginLeftSize = keyof typeof marginLeftMap;
export type MarginRightSize = keyof typeof marginRightMap;
export type PaddingXSize = keyof typeof paddingXMap;
export type PaddingYSize = keyof typeof paddingYMap;
export type PaddingTopSize = keyof typeof paddingTopMap;
export type PaddingBottomSize = keyof typeof paddingBottomMap;
export type PaddingLeftSize = keyof typeof paddingLeftMap;
export type PaddingRightSize = keyof typeof paddingRightMap;
export type SpaceXSize = keyof typeof spaceXMap;
export type SpaceYSize = keyof typeof spaceYMap;

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
	 * 设置水平方向外边距（margin-left 和 margin-right）
	 * @param size 外边距大小
	 */
	mx(size: MarginXSize): this {
		this.classes.push(marginXMap[size]);
		return this;
	}

	/**
	 * 设置垂直方向外边距（margin-top 和 margin-bottom）
	 * @param size 外边距大小
	 */
	my(size: MarginYSize): this {
		this.classes.push(marginYMap[size]);
		return this;
	}

	/**
	 * 设置顶部外边距
	 * @param size 外边距大小
	 */
	mt(size: MarginTopSize): this {
		this.classes.push(marginTopMap[size]);
		return this;
	}

	/**
	 * 设置底部外边距
	 * @param size 外边距大小
	 */
	mb(size: MarginBottomSize): this {
		this.classes.push(marginBottomMap[size]);
		return this;
	}

	/**
	 * 设置左侧外边距
	 * @param size 外边距大小
	 */
	ml(size: MarginLeftSize): this {
		this.classes.push(marginLeftMap[size]);
		return this;
	}

	/**
	 * 设置右侧外边距
	 * @param size 外边距大小
	 */
	mr(size: MarginRightSize): this {
		this.classes.push(marginRightMap[size]);
		return this;
	}

	/**
	 * 设置水平方向内边距（padding-left 和 padding-right）
	 * @param size 内边距大小
	 */
	px(size: PaddingXSize): this {
		this.classes.push(paddingXMap[size]);
		return this;
	}

	/**
	 * 设置垂直方向内边距（padding-top 和 padding-bottom）
	 * @param size 内边距大小
	 */
	py(size: PaddingYSize): this {
		this.classes.push(paddingYMap[size]);
		return this;
	}

	/**
	 * 设置顶部内边距
	 * @param size 内边距大小
	 */
	pt(size: PaddingTopSize): this {
		this.classes.push(paddingTopMap[size]);
		return this;
	}

	/**
	 * 设置底部内边距
	 * @param size 内边距大小
	 */
	pb(size: PaddingBottomSize): this {
		this.classes.push(paddingBottomMap[size]);
		return this;
	}

	/**
	 * 设置左侧内边距
	 * @param size 内边距大小
	 */
	pl(size: PaddingLeftSize): this {
		this.classes.push(paddingLeftMap[size]);
		return this;
	}

	/**
	 * 设置右侧内边距
	 * @param size 内边距大小
	 */
	pr(size: PaddingRightSize): this {
		this.classes.push(paddingRightMap[size]);
		return this;
	}

	/**
	 * 设置水平方向子元素间距
	 * @param size 间距大小
	 */
	spaceX(size: SpaceXSize): this {
		this.classes.push(spaceXMap[size]);
		return this;
	}

	/**
	 * 设置垂直方向子元素间距
	 * @param size 间距大小
	 */
	spaceY(size: SpaceYSize): this {
		this.classes.push(spaceYMap[size]);
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
