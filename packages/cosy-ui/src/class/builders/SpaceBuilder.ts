/**
 * SpaceBuilder - 子元素间距相关的类名构建
 *
 * 负责构建 space-x 和 space-y 相关的类名
 */

// Space X 类名映射表
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

// Space Y 类名映射表
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
export type SpaceXSize = keyof typeof spaceXMap;
export type SpaceYSize = keyof typeof spaceYMap;

export class SpaceBuilder {
	private classes: string[] = [];

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
