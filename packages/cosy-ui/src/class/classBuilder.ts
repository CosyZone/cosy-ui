/**
 * ClassBuilder - 统一的类名构建工具
 *
 * 通过组合多个专门的 Builder 来实现关注点分离。
 * 提供链式调用的方式来构建 Tailwind CSS 类名，统一管理所有组件的类名。
 *
 * @example
 * ```typescript
 * const className = cn()
 *   .flex('row')
 *   .items('center')
 *   .gap(4)
 *   .w('full')
 *   .build()
 * // 输出: "cosy:flex cosy:flex-row cosy:items-center cosy:gap-4 cosy:w-full"
 * ```
 */

import {
	LayoutBuilder,
	type FlexDirection,
	type ItemsAlign,
	type JustifyAlign,
} from "./builders/LayoutBuilder";
import {
	SpacingBuilder,
	type GapSize,
	type PaddingSize,
	type MarginSize,
} from "./builders/SpacingBuilder";
import {
	SizeBuilder,
	type WidthSize,
	type HeightSize,
	type MinWidthSize,
	type MinHeightSize,
	type MaxWidthSize,
	type MaxHeightSize,
} from "./builders/SizeBuilder";
import {
	TextBuilder,
	type TextSize,
	type TextColor,
	type TextAlign,
	type FontWeight,
} from "./builders/TextBuilder";
import {
	OpacityBuilder,
	type OpacityValue,
	type BgOpacityValue,
	type TextOpacityValue,
} from "./builders/OpacityBuilder";
import { PositionBuilder } from "./builders/PositionBuilder";

class ClassBuilder {
	// 统一的类名数组，保持调用顺序
	private classes: string[] = [];

	// 组合各个专门的 builder（用于复杂场景，但不直接使用它们的数组）
	private readonly layoutBuilder = new LayoutBuilder();
	private readonly spacingBuilder = new SpacingBuilder();
	private readonly sizeBuilder = new SizeBuilder();
	private readonly textBuilder = new TextBuilder();
	private readonly opacityBuilder = new OpacityBuilder();
	private readonly positionBuilder = new PositionBuilder();

	constructor(initialClasses: string[] = []) {
		this.classes = [...initialClasses];
	}

	// ========== 布局相关方法（委托给 LayoutBuilder） ==========

	/**
	 * 添加 flex 布局
	 * @param direction flex 方向
	 */
	flex(direction?: FlexDirection): this {
		// 使用临时 builder 获取类名，但添加到主数组保持顺序
		const tempBuilder = new LayoutBuilder();
		tempBuilder.flex(direction);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 添加 inline-flex 布局
	 */
	inline(): this {
		const tempBuilder = new LayoutBuilder();
		tempBuilder.inline();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 flex 项目的对齐方式（垂直方向）
	 * @param align 对齐方式
	 */
	items(align: ItemsAlign): this {
		const tempBuilder = new LayoutBuilder();
		tempBuilder.items(align);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 flex 项目的对齐方式（水平方向）
	 * @param align 对齐方式
	 */
	justify(align: JustifyAlign): this {
		const tempBuilder = new LayoutBuilder();
		tempBuilder.justify(align);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 间距相关方法（委托给 SpacingBuilder） ==========

	/**
	 * 设置间距
	 * @param size 间距大小
	 */
	gap(size: GapSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.gap(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置内边距
	 * @param size 内边距大小
	 */
	padding(size: PaddingSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.padding(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置外边距
	 * @param size 外边距大小
	 */
	margin(size: MarginSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.margin(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 尺寸相关方法（委托给 SizeBuilder） ==========

	/**
	 * 设置宽度
	 * @param size 宽度值
	 */
	w(size: WidthSize): this {
		const tempBuilder = new SizeBuilder();
		tempBuilder.w(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置高度
	 * @param size 高度值
	 */
	h(size: HeightSize): this {
		const tempBuilder = new SizeBuilder();
		tempBuilder.h(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置最小宽度
	 * @param size 最小宽度值
	 */
	minW(size: MinWidthSize): this {
		const tempBuilder = new SizeBuilder();
		tempBuilder.minW(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置最小高度
	 * @param size 最小高度值
	 */
	minH(size: MinHeightSize): this {
		const tempBuilder = new SizeBuilder();
		tempBuilder.minH(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置最大宽度
	 * @param size 最大宽度值
	 */
	maxW(size: MaxWidthSize): this {
		const tempBuilder = new SizeBuilder();
		tempBuilder.maxW(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置最大高度
	 * @param size 最大高度值
	 */
	maxH(size: MaxHeightSize): this {
		const tempBuilder = new SizeBuilder();
		tempBuilder.maxH(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 文本相关方法（委托给 TextBuilder） ==========

	/**
	 * 设置文本大小
	 * @param size 文本大小
	 */
	text(size: TextSize): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.text(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置文本加粗
	 */
	bold(): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.bold();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置文本颜色
	 * @param color 颜色值
	 */
	color(color: TextColor): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.color(color);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置文本对齐
	 * @param align 对齐方式
	 */
	align(align: TextAlign): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.align(align);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置字体粗细
	 * @param weight 粗细值
	 */
	weight(weight: FontWeight): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.weight(weight);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 透明度相关方法（委托给 OpacityBuilder） ==========

	/**
	 * 设置透明度
	 * @param value 透明度值（0-100）
	 */
	opacity(value: OpacityValue): this {
		const tempBuilder = new OpacityBuilder();
		tempBuilder.opacity(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置背景透明度
	 * @param value 透明度值（0-100）
	 */
	bgOpacity(value: BgOpacityValue): this {
		const tempBuilder = new OpacityBuilder();
		tempBuilder.bgOpacity(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置文本透明度
	 * @param value 透明度值（0-100）
	 */
	textOpacity(value: TextOpacityValue): this {
		const tempBuilder = new OpacityBuilder();
		tempBuilder.textOpacity(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 定位相关方法（委托给 PositionBuilder） ==========

	/**
	 * 设置 margin-left: auto（常用于右对齐）
	 */
	auto(): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.auto();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 margin-right: auto（常用于左对齐）
	 */
	autoRight(): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.autoRight();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 margin: auto（常用于居中）
	 */
	autoCenter(): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.autoCenter();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置相对定位
	 */
	relative(): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.relative();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置绝对定位
	 */
	absolute(): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.absolute();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置固定定位
	 */
	fixed(): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.fixed();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 通用方法 ==========

	/**
	 * 添加自定义类名
	 * @param classNames 要添加的类名
	 */
	add(...classNames: string[]): this {
		this.classes.push(...classNames.filter(Boolean));
		return this;
	}

	/**
	 * 构建最终的类名字符串
	 * @returns 类名字符串
	 */
	build(): string {
		return this.classes.filter(Boolean).join(" ");
	}

	/**
	 * 支持直接转字符串
	 * @returns 类名字符串
	 */
	toString(): string {
		return this.build();
	}
}

/**
 * 创建一个新的 ClassBuilder 实例
 * @param initialClasses 初始类名数组
 * @returns ClassBuilder 实例
 */
export function cn(initialClasses?: string[]): ClassBuilder {
	return new ClassBuilder(initialClasses);
}

export { ClassBuilder };
