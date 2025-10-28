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

// 导出类型定义
export type FlexDirection = keyof typeof flexDirectionMap;
export type ItemsAlign = keyof typeof itemsAlignMap;
export type JustifyAlign = keyof typeof justifyAlignMap;

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
