/**
 * PositionBuilder - 定位相关的类名构建
 *
 * 负责构建定位、对齐等相关的类名
 */

// Inset 值的映射表
const insetMap = {
	0: "cosy:inset-0",
	1: "cosy:inset-1",
	2: "cosy:inset-2",
	3: "cosy:inset-3",
	4: "cosy:inset-4",
	5: "cosy:inset-5",
	6: "cosy:inset-6",
	8: "cosy:inset-8",
	10: "cosy:inset-10",
	12: "cosy:inset-12",
	16: "cosy:inset-16",
	auto: "cosy:inset-auto",
} as const;

const insetXMap = {
	0: "cosy:inset-x-0",
	1: "cosy:inset-x-1",
	2: "cosy:inset-x-2",
	3: "cosy:inset-x-3",
	4: "cosy:inset-x-4",
	5: "cosy:inset-x-5",
	6: "cosy:inset-x-6",
	8: "cosy:inset-x-8",
	10: "cosy:inset-x-10",
	12: "cosy:inset-x-12",
	16: "cosy:inset-x-16",
	auto: "cosy:inset-x-auto",
} as const;

const insetYMap = {
	0: "cosy:inset-y-0",
	1: "cosy:inset-y-1",
	2: "cosy:inset-y-2",
	3: "cosy:inset-y-3",
	4: "cosy:inset-y-4",
	5: "cosy:inset-y-5",
	6: "cosy:inset-y-6",
	8: "cosy:inset-y-8",
	10: "cosy:inset-y-10",
	12: "cosy:inset-y-12",
	16: "cosy:inset-y-16",
	auto: "cosy:inset-y-auto",
} as const;

// Z-index 值的映射表
const zIndexMap = {
	"-10": "cosy:-z-10",
	0: "cosy:z-0",
	10: "cosy:z-10",
	20: "cosy:z-20",
	30: "cosy:z-30",
	40: "cosy:z-40",
	50: "cosy:z-50",
	auto: "cosy:z-auto",
} as const;

// Pointer events 值的映射表
const pointerEventsMap = {
	none: "cosy:pointer-events-none",
	auto: "cosy:pointer-events-auto",
} as const;

// 导出类型定义
export type InsetSize = keyof typeof insetMap;
export type InsetXSize = keyof typeof insetXMap;
export type InsetYSize = keyof typeof insetYMap;
export type ZIndexValue = keyof typeof zIndexMap;
export type PointerEventsValue = keyof typeof pointerEventsMap;

export class PositionBuilder {
	private classes: string[] = [];

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
		this.classes.push("cosy:mx-auto");
		return this;
	}

	/**
	 * 设置相对定位
	 */
	relative(): this {
		this.classes.push("cosy:relative");
		return this;
	}

	/**
	 * 设置绝对定位
	 */
	absolute(): this {
		this.classes.push("cosy:absolute");
		return this;
	}

	/**
	 * 设置固定定位
	 */
	fixed(): this {
		this.classes.push("cosy:fixed");
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
