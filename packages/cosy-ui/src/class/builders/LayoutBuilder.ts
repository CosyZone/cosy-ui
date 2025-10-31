/**
 * LayoutBuilder - 布局相关的类名构建
 *
 * 负责构建 flex、对齐等布局相关的类名
 */

// 类名映射表 - 确保 Tailwind 能够扫描到所有类名
const flexDirectionMap = {
	row: "cosy:flex-row",
	col: "cosy:flex-col",
	"row-reverse": "cosy:flex-row-reverse",
	"col-reverse": "cosy:flex-col-reverse",
} as const;

const itemsAlignMap = {
	start: "cosy:items-start",
	end: "cosy:items-end",
	center: "cosy:items-center",
	baseline: "cosy:items-baseline",
	stretch: "cosy:items-stretch",
} as const;

const justifyAlignMap = {
	start: "cosy:justify-start",
	end: "cosy:justify-end",
	center: "cosy:justify-center",
	between: "cosy:justify-between",
	around: "cosy:justify-around",
	evenly: "cosy:justify-evenly",
} as const;

// Place items 映射表
const placeItemsMap = {
	start: "cosy:place-items-start",
	end: "cosy:place-items-end",
	center: "cosy:place-items-center",
	baseline: "cosy:place-items-baseline",
	stretch: "cosy:place-items-stretch",
} as const;

// Flex 属性映射表
const flexGrowMap = {
	0: "cosy:flex-grow-0",
	1: "cosy:flex-grow-1",
} as const;

const flexShrinkMap = {
	0: "cosy:shrink-0",
	1: "cosy:shrink",
} as const;

const flexValueMap = {
	1: "cosy:flex-1",
	auto: "cosy:flex-auto",
	initial: "cosy:flex-initial",
	none: "cosy:flex-none",
} as const;

// 导出类型定义
export type FlexDirection = keyof typeof flexDirectionMap;
export type ItemsAlign = keyof typeof itemsAlignMap;
export type JustifyAlign = keyof typeof justifyAlignMap;
export type PlaceItemsAlign = keyof typeof placeItemsMap;
export type FlexGrowValue = keyof typeof flexGrowMap;
export type FlexShrinkValue = keyof typeof flexShrinkMap;
export type FlexValue = keyof typeof flexValueMap;

export class LayoutBuilder {
	private classes: string[] = [];

	/**
	 * 添加 flex 布局
	 * @param direction flex 方向
	 */
	flex(direction?: FlexDirection): this {
		this.classes.push("cosy:flex");
		if (direction) {
			this.classes.push(flexDirectionMap[direction]);
		}
		return this;
	}

	/**
	 * 添加 inline-flex 布局
	 */
	inline(): this {
		this.classes.push("cosy:inline-flex");
		return this;
	}

	/**
	 * 设置 flex 项目的对齐方式（垂直方向）
	 * @param align 对齐方式
	 */
	items(align: ItemsAlign): this {
		this.classes.push(itemsAlignMap[align]);
		return this;
	}

	/**
	 * 设置 flex 项目的对齐方式（水平方向）
	 * @param align 对齐方式
	 */
	justify(align: JustifyAlign): this {
		this.classes.push(justifyAlignMap[align]);
		return this;
	}

	/**
	 * 添加 grid 布局
	 */
	grid(): this {
		this.classes.push("cosy:grid");
		return this;
	}

	/**
	 * 设置 place-items（同时设置 align-items 和 justify-items）
	 * @param align 对齐方式
	 */
	placeItems(align: PlaceItemsAlign): this {
		this.classes.push(placeItemsMap[align]);
		return this;
	}

	/**
	 * 设置 flex-grow
	 * @param value flex-grow 值
	 */
	flexGrow(value: FlexGrowValue): this {
		this.classes.push(flexGrowMap[value]);
		return this;
	}

	/**
	 * 设置 flex-shrink
	 * @param value flex-shrink 值
	 */
	shrink(value: FlexShrinkValue): this {
		this.classes.push(flexShrinkMap[value]);
		return this;
	}

	/**
	 * 设置 shrink-0（不收缩）
	 */
	shrink0(): this {
		this.classes.push(flexShrinkMap[0]);
		return this;
	}

	/**
	 * 设置 flex 值（flex-1, flex-auto 等）
	 * @param value flex 值
	 */
	flexValue(value: FlexValue): this {
		this.classes.push(flexValueMap[value]);
		return this;
	}

	/**
	 * 设置 flex-1（自动填充剩余空间）
	 */
	flex1(): this {
		this.classes.push(flexValueMap[1]);
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
