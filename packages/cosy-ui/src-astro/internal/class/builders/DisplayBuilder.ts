/**
 * DisplayBuilder - 显示相关的类名构建
 *
 * 负责构建 display 相关的类名
 */

// 显示类型类名映射表 - 确保 Tailwind 能够扫描到所有类名
const displayMap = {
	block: "cosy:block",
	"inline-block": "cosy:inline-block",
	inline: "cosy:inline",
	flex: "cosy:flex",
	"inline-flex": "cosy:inline-flex",
	table: "cosy:table",
	"inline-table": "cosy:inline-table",
	"table-caption": "cosy:table-caption",
	"table-cell": "cosy:table-cell",
	"table-column": "cosy:table-column",
	"table-column-group": "cosy:table-column-group",
	"table-footer-group": "cosy:table-footer-group",
	"table-header-group": "cosy:table-header-group",
	"table-row-group": "cosy:table-row-group",
	"table-row": "cosy:table-row",
	"flow-root": "cosy:flow-root",
	grid: "cosy:grid",
	"inline-grid": "cosy:inline-grid",
	contents: "cosy:contents",
	"list-item": "cosy:list-item",
	hidden: "cosy:hidden",
} as const;

// 导出类型定义
export type DisplayType = keyof typeof displayMap;

export class DisplayBuilder {
	private classes: string[] = [];

	/**
	 * 设置显示类型
	 * @param type 显示类型值
	 */
	display(type: DisplayType): this {
		this.classes.push(displayMap[type]);
		return this;
	}

	/**
	 * 设置为块级元素
	 */
	block(): this {
		this.classes.push(displayMap.block);
		return this;
	}

	/**
	 * 设置为行内块级元素
	 */
	inlineBlock(): this {
		this.classes.push(displayMap["inline-block"]);
		return this;
	}

	/**
	 * 设置为行内元素
	 */
	inline(): this {
		this.classes.push(displayMap.inline);
		return this;
	}

	/**
	 * 设置为网格容器
	 */
	grid(): this {
		this.classes.push(displayMap.grid);
		return this;
	}

	/**
	 * 设置为隐藏
	 */
	hidden(): this {
		this.classes.push(displayMap.hidden);
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
