/**
 * ObjectBuilder - 对象适配相关的类名构建
 *
 * 负责构建 object-fit、object-position 等相关的类名
 */

// 对象适配类名映射表 - 确保 Tailwind 能够扫描到所有类名
const objectFitMap = {
	contain: "cosy:object-contain",
	cover: "cosy:object-cover",
	fill: "cosy:object-fill",
	none: "cosy:object-none",
	"scale-down": "cosy:object-scale-down",
} as const;

// 对象位置类名映射表
const objectPositionMap = {
	bottom: "cosy:object-bottom",
	center: "cosy:object-center",
	left: "cosy:object-left",
	"left-bottom": "cosy:object-left-bottom",
	"left-top": "cosy:object-left-top",
	right: "cosy:object-right",
	"right-bottom": "cosy:object-right-bottom",
	"right-top": "cosy:object-right-top",
	top: "cosy:object-top",
} as const;

// 导出类型定义
export type ObjectFit = keyof typeof objectFitMap;
export type ObjectPosition = keyof typeof objectPositionMap;

export class ObjectBuilder {
	private classes: string[] = [];

	/**
	 * 设置对象适配方式
	 * @param fit 对象适配值
	 */
	objectFit(fit: ObjectFit): this {
		this.classes.push(objectFitMap[fit]);
		return this;
	}

	/**
	 * 设置对象覆盖
	 */
	objectCover(): this {
		this.classes.push(objectFitMap.cover);
		return this;
	}

	/**
	 * 设置对象包含
	 */
	objectContain(): this {
		this.classes.push(objectFitMap.contain);
		return this;
	}

	/**
	 * 设置对象位置
	 * @param position 对象位置值
	 */
	objectPosition(position: ObjectPosition): this {
		this.classes.push(objectPositionMap[position]);
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
