/**
 * ClassBuilder 预设 - 常用的类名组合
 *
 * 提供预定义的类名组合，方便快速使用
 */

import { cn } from "./classBuilder";

/**
 * 布局预设
 */
export const layouts = {
	/**
	 * 水平 flex 布局
	 */
	flexRow: () => cn().flex("row"),

	/**
	 * 垂直 flex 布局
	 */
	flexCol: () => cn().flex("col"),

	/**
	 * 水平垂直居中
	 */
	flexCenter: () => cn().flex("row").items("center").justify("center"),

	/**
	 * 两端对齐
	 */
	flexBetween: () => cn().flex("row").items("center").justify("between"),

	/**
	 * 垂直居中
	 */
	flexItemsCenter: () => cn().flex("row").items("center"),
};

/**
 * 按钮预设
 */
export const buttons = {
	/**
	 * 基础按钮
	 */
	base: () => cn().add("cosy:btn"),

	/**
	 * Ghost 按钮
	 */
	ghost: () => cn().add("cosy:btn", "cosy:btn-ghost"),

	/**
	 * 圆形按钮
	 * @param size 按钮大小
	 */
	circle: (size: "sm" | "md" | "lg" = "md") =>
		cn().add("cosy:btn", "cosy:btn-circle", `cosy:btn-${size}`),

	/**
	 * Ghost 圆形按钮
	 * @param size 按钮大小
	 */
	ghostCircle: (size: "sm" | "md" | "lg" = "md") =>
		cn().add(
			"cosy:btn",
			"cosy:btn-ghost",
			"cosy:btn-circle",
			`cosy:btn-${size}`,
		),
};
