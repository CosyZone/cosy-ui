/**
 * ListBuilder - 列表相关的类名构建
 *
 * 负责构建列表样式相关的类名
 */

// 列表样式类型映射表
const listStyleMap = {
	disc: "cosy:list-disc",
	decimal: "cosy:list-decimal",
	none: "cosy:list-none",
} as const;

// 导出类型定义
export type ListStyleType = keyof typeof listStyleMap;

export class ListBuilder {
	private classes: string[] = [];

	/**
	 * 设置列表样式类型
	 * @param style 列表样式
	 */
	listStyle(style: ListStyleType): this {
		this.classes.push(listStyleMap[style]);
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
