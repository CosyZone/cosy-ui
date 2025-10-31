/**
 * ZIndexBuilder - 层级相关的类名构建
 *
 * 负责构建 z-index 相关的类名
 */

// Z-index 类名映射表
const zIndexMap = {
	0: "cosy:z-0",
	10: "cosy:z-10",
	20: "cosy:z-20",
	30: "cosy:z-30",
	40: "cosy:z-40",
	50: "cosy:z-50",
	auto: "cosy:z-auto",
	1: "cosy:z-1", // 自定义值，常用于小幅度层级调整
} as const;

// 导出类型定义
export type ZIndexValue = keyof typeof zIndexMap;

export class ZIndexBuilder {
	private classes: string[] = [];

	/**
	 * 设置层级
	 * @param value 层级值
	 */
	zIndex(value: ZIndexValue): this {
		this.classes.push(zIndexMap[value]);
		return this;
	}

	/**
	 * 设置层级为 0
	 */
	z0(): this {
		this.classes.push(zIndexMap[0]);
		return this;
	}

	/**
	 * 设置层级为 1
	 */
	z1(): this {
		this.classes.push(zIndexMap[1]);
		return this;
	}

	/**
	 * 设置层级为 10
	 */
	z10(): this {
		this.classes.push(zIndexMap[10]);
		return this;
	}

	/**
	 * 设置层级为 20
	 */
	z20(): this {
		this.classes.push(zIndexMap[20]);
		return this;
	}

	/**
	 * 设置层级为 50
	 */
	z50(): this {
		this.classes.push(zIndexMap[50]);
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
