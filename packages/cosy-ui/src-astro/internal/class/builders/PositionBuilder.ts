/**
 * PositionBuilder - 定位相关的类名构建
 *
 * 负责构建 position 相关的类名，包括 position、top/right/bottom/left、
 * inset、z-index、pointer-events 等
 */

// Position 类名映射表
const positionMap = {
	static: "cosy:static",
	fixed: "cosy:fixed",
	absolute: "cosy:absolute",
	relative: "cosy:relative",
	sticky: "cosy:sticky",
} as const;

// Inset 类名映射表（top、right、bottom、left 同时设置）
const insetMap = {
	0: "cosy:inset-0",
	"0.5": "cosy:inset-0.5",
	1: "cosy:inset-1",
	"1.5": "cosy:inset-1.5",
	2: "cosy:inset-2",
	"2.5": "cosy:inset-2.5",
	3: "cosy:inset-3",
	4: "cosy:inset-4",
	5: "cosy:inset-5",
	6: "cosy:inset-6",
	8: "cosy:inset-8",
	10: "cosy:inset-10",
	12: "cosy:inset-12",
	16: "cosy:inset-16",
	auto: "cosy:inset-auto",
	"1/2": "cosy:inset-1/2",
	"1/3": "cosy:inset-1/3",
	"2/3": "cosy:inset-2/3",
	"1/4": "cosy:inset-1/4",
	"3/4": "cosy:inset-3/4",
	full: "cosy:inset-full",
	"-full": "cosy:-inset-full",
	"-1/2": "cosy:-inset-1/2",
	"-1/3": "cosy:-inset-1/3",
	"-2/3": "cosy:-inset-2/3",
	"-1/4": "cosy:-inset-1/4",
	"-3/4": "cosy:-inset-3/4",
} as const;

// Inset X 类名映射表（left 和 right）
const insetXMap = {
	0: "cosy:inset-x-0",
	"0.5": "cosy:inset-x-0.5",
	1: "cosy:inset-x-1",
	"1.5": "cosy:inset-x-1.5",
	2: "cosy:inset-x-2",
	"2.5": "cosy:inset-x-2.5",
	3: "cosy:inset-x-3",
	4: "cosy:inset-x-4",
	5: "cosy:inset-x-5",
	6: "cosy:inset-x-6",
	8: "cosy:inset-x-8",
	10: "cosy:inset-x-10",
	12: "cosy:inset-x-12",
	16: "cosy:inset-x-16",
	auto: "cosy:inset-x-auto",
	"1/2": "cosy:inset-x-1/2",
	"1/3": "cosy:inset-x-1/3",
	"2/3": "cosy:inset-x-2/3",
	"1/4": "cosy:inset-x-1/4",
	"3/4": "cosy:inset-x-3/4",
	full: "cosy:inset-x-full",
	"-full": "cosy:-inset-x-full",
	"-1/2": "cosy:-inset-x-1/2",
	"-1/3": "cosy:-inset-x-1/3",
	"-2/3": "cosy:-inset-x-2/3",
	"-1/4": "cosy:-inset-x-1/4",
	"-3/4": "cosy:-inset-x-3/4",
} as const;

// Inset Y 类名映射表（top 和 bottom）
const insetYMap = {
	0: "cosy:inset-y-0",
	"0.5": "cosy:inset-y-0.5",
	1: "cosy:inset-y-1",
	"1.5": "cosy:inset-y-1.5",
	2: "cosy:inset-y-2",
	"2.5": "cosy:inset-y-2.5",
	3: "cosy:inset-y-3",
	4: "cosy:inset-y-4",
	5: "cosy:inset-y-5",
	6: "cosy:inset-y-6",
	8: "cosy:inset-y-8",
	10: "cosy:inset-y-10",
	12: "cosy:inset-y-12",
	16: "cosy:inset-y-16",
	auto: "cosy:inset-y-auto",
	"1/2": "cosy:inset-y-1/2",
	"1/3": "cosy:inset-y-1/3",
	"2/3": "cosy:inset-y-2/3",
	"1/4": "cosy:inset-y-1/4",
	"3/4": "cosy:inset-y-3/4",
	full: "cosy:inset-y-full",
	"-full": "cosy:-inset-y-full",
	"-1/2": "cosy:-inset-y-1/2",
	"-1/3": "cosy:-inset-y-1/3",
	"-2/3": "cosy:-inset-y-2/3",
	"-1/4": "cosy:-inset-y-1/4",
	"-3/4": "cosy:-inset-y-3/4",
} as const;

// Z-index 类名映射表
const zIndexMap = {
	0: "cosy:z-0",
	10: "cosy:z-10",
	20: "cosy:z-20",
	30: "cosy:z-30",
	40: "cosy:z-40",
	50: "cosy:z-50",
	auto: "cosy:z-auto",
	"-10": "cosy:-z-10",
	"-20": "cosy:-z-20",
	"-30": "cosy:-z-30",
	"-40": "cosy:-z-40",
	"-50": "cosy:-z-50",
	1: "cosy:z-1", // 自定义值，常用于小幅度层级调整
} as const;

// Pointer events 类名映射表
const pointerEventsMap = {
	none: "cosy:pointer-events-none",
	auto: "cosy:pointer-events-auto",
} as const;

// Position 值类名映射表
const positionValueMap = {
	0: {
		top: "cosy:top-0",
		right: "cosy:right-0",
		bottom: "cosy:bottom-0",
		left: "cosy:left-0",
	},
	"0.5": {
		top: "cosy:top-0.5",
		right: "cosy:right-0.5",
		bottom: "cosy:bottom-0.5",
		left: "cosy:left-0.5",
	},
	1: {
		top: "cosy:top-1",
		right: "cosy:right-1",
		bottom: "cosy:bottom-1",
		left: "cosy:left-1",
	},
	"1.5": {
		top: "cosy:top-1.5",
		right: "cosy:right-1.5",
		bottom: "cosy:bottom-1.5",
		left: "cosy:left-1.5",
	},
	2: {
		top: "cosy:top-2",
		right: "cosy:right-2",
		bottom: "cosy:bottom-2",
		left: "cosy:left-2",
	},
	"2.5": {
		top: "cosy:top-2.5",
		right: "cosy:right-2.5",
		bottom: "cosy:bottom-2.5",
		left: "cosy:left-2.5",
	},
	3: {
		top: "cosy:top-3",
		right: "cosy:right-3",
		bottom: "cosy:bottom-3",
		left: "cosy:left-3",
	},
	4: {
		top: "cosy:top-4",
		right: "cosy:right-4",
		bottom: "cosy:bottom-4",
		left: "cosy:left-4",
	},
	5: {
		top: "cosy:top-5",
		right: "cosy:right-5",
		bottom: "cosy:bottom-5",
		left: "cosy:left-5",
	},
	6: {
		top: "cosy:top-6",
		right: "cosy:right-6",
		bottom: "cosy:bottom-6",
		left: "cosy:left-6",
	},
	8: {
		top: "cosy:top-8",
		right: "cosy:right-8",
		bottom: "cosy:bottom-8",
		left: "cosy:left-8",
	},
	10: {
		top: "cosy:top-10",
		right: "cosy:right-10",
		bottom: "cosy:bottom-10",
		left: "cosy:left-10",
	},
	12: {
		top: "cosy:top-12",
		right: "cosy:right-12",
		bottom: "cosy:bottom-12",
		left: "cosy:left-12",
	},
	16: {
		top: "cosy:top-16",
		right: "cosy:right-16",
		bottom: "cosy:bottom-16",
		left: "cosy:left-16",
	},
	20: {
		top: "cosy:top-20",
		right: "cosy:right-20",
		bottom: "cosy:bottom-20",
		left: "cosy:left-20",
	},
	24: {
		top: "cosy:top-24",
		right: "cosy:right-24",
		bottom: "cosy:bottom-24",
		left: "cosy:left-24",
	},
	auto: {
		top: "cosy:top-auto",
		right: "cosy:right-auto",
		bottom: "cosy:bottom-auto",
		left: "cosy:left-auto",
	},
	"1/2": {
		top: "cosy:top-1/2",
		right: "cosy:right-1/2",
		bottom: "cosy:bottom-1/2",
		left: "cosy:left-1/2",
	},
	"1/3": {
		top: "cosy:top-1/3",
		right: "cosy:right-1/3",
		bottom: "cosy:bottom-1/3",
		left: "cosy:left-1/3",
	},
	"2/3": {
		top: "cosy:top-2/3",
		right: "cosy:right-2/3",
		bottom: "cosy:bottom-2/3",
		left: "cosy:left-2/3",
	},
	"1/4": {
		top: "cosy:top-1/4",
		right: "cosy:right-1/4",
		bottom: "cosy:bottom-1/4",
		left: "cosy:left-1/4",
	},
	"3/4": {
		top: "cosy:top-3/4",
		right: "cosy:right-3/4",
		bottom: "cosy:bottom-3/4",
		left: "cosy:left-3/4",
	},
	full: {
		top: "cosy:top-full",
		right: "cosy:right-full",
		bottom: "cosy:bottom-full",
		left: "cosy:left-full",
	},
} as const;

// 导出类型定义
export type PositionType = keyof typeof positionMap;
export type PositionValue = keyof typeof positionValueMap;
export type InsetSize = keyof typeof insetMap;
export type InsetXSize = keyof typeof insetXMap;
export type InsetYSize = keyof typeof insetYMap;
export type ZIndexValue = keyof typeof zIndexMap;
export type PointerEventsValue = keyof typeof pointerEventsMap;

export class PositionBuilder {
	private classes: string[] = [];

	/**
	 * 设置定位方式
	 * @param type 定位类型
	 */
	position(type: PositionType): this {
		this.classes.push(positionMap[type]);
		return this;
	}

	/**
	 * 设置绝对定位
	 */
	absolute(): this {
		this.classes.push(positionMap.absolute);
		return this;
	}

	/**
	 * 设置相对定位
	 */
	relative(): this {
		this.classes.push(positionMap.relative);
		return this;
	}

	/**
	 * 设置固定定位
	 */
	fixed(): this {
		this.classes.push(positionMap.fixed);
		return this;
	}

	/**
	 * 设置粘性定位
	 */
	sticky(): this {
		this.classes.push(positionMap.sticky);
		return this;
	}

	/**
	 * 设置顶部位置
	 * @param value 位置值
	 */
	top(value: PositionValue): this {
		this.classes.push(positionValueMap[value].top);
		return this;
	}

	/**
	 * 设置右侧位置
	 * @param value 位置值
	 */
	right(value: PositionValue): this {
		this.classes.push(positionValueMap[value].right);
		return this;
	}

	/**
	 * 设置底部位置
	 * @param value 位置值
	 */
	bottom(value: PositionValue): this {
		this.classes.push(positionValueMap[value].bottom);
		return this;
	}

	/**
	 * 设置左侧位置
	 * @param value 位置值
	 */
	left(value: PositionValue): this {
		this.classes.push(positionValueMap[value].left);
		return this;
	}

	/**
	 * 设置所有方向为 0
	 */
	inset0(): this {
		this.classes.push(
			"cosy:top-0",
			"cosy:right-0",
			"cosy:bottom-0",
			"cosy:left-0",
		);
		return this;
	}

	/**
	 * 设置 margin-left: auto（常用于右对齐）
	 */
	auto(): this {
		this.classes.push("cosy:ml-auto");
		return this;
	}

	/**
	 * 设置 margin-right: auto（常用于左对齐）
	 */
	autoRight(): this {
		this.classes.push("cosy:mr-auto");
		return this;
	}

	/**
	 * 设置 margin: auto（常用于居中）
	 */
	autoCenter(): this {
		this.classes.push("cosy:m-auto");
		return this;
	}

	/**
	 * 设置 inset（top、right、bottom、left 同时设置）
	 * @param size inset 值
	 */
	inset(size: InsetSize): this {
		this.classes.push(insetMap[size]);
		return this;
	}

	/**
	 * 设置水平方向 inset（left 和 right）
	 * @param size inset 值
	 */
	insetX(size: InsetXSize): this {
		this.classes.push(insetXMap[size]);
		return this;
	}

	/**
	 * 设置垂直方向 inset（top 和 bottom）
	 * @param size inset 值
	 */
	insetY(size: InsetYSize): this {
		this.classes.push(insetYMap[size]);
		return this;
	}

	/**
	 * 设置 z-index 层级
	 * @param value z-index 值
	 */
	z(value: ZIndexValue): this {
		this.classes.push(zIndexMap[value]);
		return this;
	}

	/**
	 * 设置 pointer-events 属性
	 * @param value pointer-events 值
	 */
	pointerEvents(value: PointerEventsValue): this {
		this.classes.push(pointerEventsMap[value]);
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
