/**
 * OverflowBuilder - 溢出相关的类名构建
 *
 * 负责构建 overflow 相关的类名
 */

// Overflow 类名映射表
const overflowMap = {
	auto: "cosy:overflow-auto",
	hidden: "cosy:overflow-hidden",
	clip: "cosy:overflow-clip",
	visible: "cosy:overflow-visible",
	scroll: "cosy:overflow-scroll",
} as const;

// Overflow X 类名映射表
const overflowXMap = {
	auto: "cosy:overflow-x-auto",
	hidden: "cosy:overflow-x-hidden",
	clip: "cosy:overflow-x-clip",
	visible: "cosy:overflow-x-visible",
	scroll: "cosy:overflow-x-scroll",
} as const;

// Overflow Y 类名映射表
const overflowYMap = {
	auto: "cosy:overflow-y-auto",
	hidden: "cosy:overflow-y-hidden",
	clip: "cosy:overflow-y-clip",
	visible: "cosy:overflow-y-visible",
	scroll: "cosy:overflow-y-scroll",
} as const;

// 导出类型定义
export type OverflowType = keyof typeof overflowMap;
export type OverflowXType = keyof typeof overflowXMap;
export type OverflowYType = keyof typeof overflowYMap;

export class OverflowBuilder {
	private classes: string[] = [];

	/**
	 * 设置溢出行为
	 * @param type 溢出类型
	 */
	overflow(type: OverflowType): this {
		this.classes.push(overflowMap[type]);
		return this;
	}

	/**
	 * 设置溢出为隐藏
	 */
	overflowHidden(): this {
		this.classes.push(overflowMap.hidden);
		return this;
	}

	/**
	 * 设置溢出为自动滚动
	 */
	overflowAuto(): this {
		this.classes.push(overflowMap.auto);
		return this;
	}

	/**
	 * 设置 X 轴溢出行为
	 * @param type 溢出类型
	 */
	overflowX(type: OverflowXType): this {
		this.classes.push(overflowXMap[type]);
		return this;
	}

	/**
	 * 设置 Y 轴溢出行为
	 * @param type 溢出类型
	 */
	overflowY(type: OverflowYType): this {
		this.classes.push(overflowYMap[type]);
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
