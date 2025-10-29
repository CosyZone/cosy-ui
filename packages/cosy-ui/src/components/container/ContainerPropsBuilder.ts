/**
 * ContainerPropsBuilder - Container 组件的 Props 构建器
 *
 * 提供链式调用的方式来构建 Container 组件的 props。
 *
 * @example
 * ```typescript
 * // 基础用法
 * const props = containerProps().centered().build();
 *
 * // 链式调用多个属性
 * const props = containerProps()
 *   .width('lg')
 *   .padding('lg')
 *   .rounded('md')
 *   .build();
 *
 * // 使用快捷静态方法
 * const props = containerProps.centered().shadow('lg').build();
 * ```
 */

import { PropsBuilder } from "../../utils/PropsBuilder";
import type { IContainerPropsBase } from "./containerPropsBase";
import type { BackgroundColor } from "../../common/backgrounds";
import type { BorderColor } from "../../common/border";

export class ContainerPropsBuilder extends PropsBuilder<IContainerPropsBase> {
	// ========== width 相关方法 ==========

	/**
	 * 设置容器宽度
	 * @param value 宽度值
	 */
	width(value: "xs" | "sm" | "md" | "lg" | "xl" | "full"): this {
		return this.set("width", value);
	}

	/**
	 * 设置为超小宽度
	 */
	xs(): this {
		return this.width("xs");
	}

	/**
	 * 设置为小宽度
	 */
	sm(): this {
		return this.width("sm");
	}

	/**
	 * 设置为中等宽度
	 */
	md(): this {
		return this.width("md");
	}

	/**
	 * 设置为大宽度
	 */
	lg(): this {
		return this.width("lg");
	}

	/**
	 * 设置为超大宽度
	 */
	xl(): this {
		return this.width("xl");
	}

	/**
	 * 设置为全宽
	 */
	full(): this {
		return this.width("full");
	}

	// ========== padding 相关方法 ==========

	/**
	 * 设置内边距
	 * @param value 内边距大小
	 */
	padding(
		value: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl",
	): this {
		return this.set("padding", value);
	}

	// ========== margin 相关方法 ==========

	/**
	 * 设置外边距
	 * @param value 外边距大小
	 */
	margin(
		value:
			| "none"
			| "xs"
			| "sm"
			| "md"
			| "lg"
			| "xl"
			| "2xl"
			| "3xl"
			| "4xl"
			| "5xl",
	): this {
		return this.set("margin", value);
	}

	// ========== rounded 相关方法 ==========

	/**
	 * 设置圆角大小
	 * @param value 圆角大小
	 */
	rounded(value: "none" | "sm" | "md" | "lg" | "xl" | "full"): this {
		return this.set("rounded", value);
	}

	// ========== shadow 相关方法 ==========

	/**
	 * 设置阴影大小
	 * @param value 阴影大小
	 */
	shadow(value: "none" | "sm" | "md" | "lg" | "xl" | "2xl"): this {
		return this.set("shadow", value);
	}

	// ========== 布局相关方法 ==========

	/**
	 * 设置是否居中显示
	 * @param value 是否居中
	 */
	centered(value: boolean = true): this {
		return this.set("centered", value);
	}

	/**
	 * 设置内容是否居中
	 * @param value 是否居中
	 */
	contentCentered(value: boolean = true): this {
		return this.set("contentCentered", value);
	}

	/**
	 * 设置 flex 布局方向
	 * @param value flex 方向
	 */
	flex(value: "row" | "col" | "row-reverse" | "col-reverse"): this {
		return this.set("flex", value);
	}

	/**
	 * 设置 flex 项目间距
	 * @param value 间距大小
	 */
	gap(value: "none" | "xs" | "sm" | "md" | "lg" | "xl"): this {
		return this.set("gap", value);
	}

	/**
	 * 设置 flex 项目对齐方式
	 * @param value 对齐方式
	 */
	items(value: "start" | "end" | "center" | "baseline" | "stretch"): this {
		return this.set("items", value);
	}

	/**
	 * 设置 flex 项目分布方式
	 * @param value 分布方式
	 */
	justify(
		value: "start" | "end" | "center" | "between" | "around" | "evenly",
	): this {
		return this.set("justify", value);
	}

	// ========== 宽高比相关方法 ==========

	/**
	 * 设置宽高比
	 * @param value 宽高比值
	 */
	aspectRatio(value: number): this {
		return this.set("aspectRatio", value);
	}

	/**
	 * 设置内容适配模式
	 * @param value 适配模式
	 */
	fit(value: "none" | "contain" | "cover"): this {
		return this.set("fit", value);
	}

	// ========== 其他属性方法 ==========

	/**
	 * 设置自定义类名
	 * @param value 自定义类名
	 */
	class(value: string): this {
		return this.set("class", value);
	}

	/**
	 * 设置背景色
	 * @param value 背景色
	 */
	background(value: BackgroundColor): this {
		return this.set("background", value);
	}

	/**
	 * 设置容器高度
	 * @param value 高度值
	 */
	height(
		value:
			| "none"
			| "xs"
			| "sm"
			| "md"
			| "lg"
			| "xl"
			| "2xl"
			| "3xl"
			| "4xl"
			| "5xl"
			| "6xl"
			| "screen"
			| "auto",
	): this {
		return this.set("height", value);
	}

	/**
	 * 设置是否使用柔和色样式
	 * @param value 是否使用
	 */
	muted(value: boolean = true): this {
		return this.set("muted", value);
	}

	/**
	 * 设置边框尺寸
	 * @param value 边框尺寸
	 */
	border(value: "none" | "sm" | "md" | "lg" | "xl"): this {
		return this.set("border", value);
	}

	/**
	 * 设置边框颜色
	 * @param value 边框颜色
	 */
	borderColor(value: BorderColor): this {
		return this.set("borderColor", value);
	}

	/**
	 * 批量设置属性
	 * @param props 属性对象
	 */
	withProps(props: Partial<IContainerPropsBase>): this {
		return this.merge(props);
	}
}

/**
 * 创建一个新的 ContainerPropsBuilder 实例
 * @returns ContainerPropsBuilder 实例
 *
 * @example
 * ```typescript
 * const props = containerProps()
 *   .lg()
 *   .padding('xl')
 *   .rounded('md')
 *   .build();
 * ```
 */
export function containerProps(): ContainerPropsBuilder {
	return new ContainerPropsBuilder();
}

// 为工厂函数添加快捷静态方法
containerProps.xs = () => containerProps().xs();
containerProps.sm = () => containerProps().sm();
containerProps.md = () => containerProps().md();
containerProps.lg = () => containerProps().lg();
containerProps.xl = () => containerProps().xl();
containerProps.full = () => containerProps().full();
containerProps.centered = () => containerProps().centered();
containerProps.contentCentered = () => containerProps().contentCentered();
