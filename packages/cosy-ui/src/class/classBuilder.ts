/**
 * ClassBuilder - 统一的类名构建工具
 *
 * 通过组合多个专门的 Builder 来实现关注点分离。
 * 提供链式调用的方式来构建 Tailwind CSS 类名，统一管理所有组件的类名。
 *
 * @example
 * ```typescript
 * // 基本用法
 * const className = cn()
 *   .flex('row')
 *   .items('center')
 *   .gap(4)
 *   .w('full')
 *   .build()
 * // 输出: "cosy:flex cosy:flex-row cosy:items-center cosy:gap-4 cosy:w-full"
 *
 * // 使用方向性间距方法
 * const spacingClass = cn()
 *   .mx('auto')  // 水平外边距
 *   .my(4)       // 垂直外边距
 *   .px(6)       // 水平内边距
 *   .py(4)       // 垂直内边距
 *   .build()
 * // 输出: "cosy:mx-auto cosy:my-4 cosy:px-6 cosy:py-4"
 *
 * // 使用定位和 inset 方法
 * const positionClass = cn()
 *   .absolute()  // 绝对定位
 *   .inset(0)    // 所有方向设为 0
 *   .build()
 * // 输出: "cosy:absolute cosy:inset-0"
 *
 * // 使用 z-index 和 pointer-events
 * const layerClass = cn()
 *   .z('-10')              // 负 z-index
 *   .pointerEvents('none') // 禁用指针事件
 *   .build()
 * // 输出: "cosy:-z-10 cosy:pointer-events-none"
 * ```
 */

import {
	BackgroundBuilder,
	type BackgroundColor,
} from "./builders/BackgroundBuilder";
import {
	BorderBuilder,
	type BorderColor,
	type BorderWidth,
	type RoundedBottomSize,
	type RoundedLeftSize,
	type RoundedRightSize,
	type RoundedSize,
	type RoundedTopSize,
} from "./builders/BorderBuilder";
import { CursorBuilder, type CursorType } from "./builders/CursorBuilder";
import { DisplayBuilder, type DisplayType } from "./builders/DisplayBuilder";
import {
	type BackdropBlurSize,
	type BackdropBrightnessValue,
	type BackdropSaturateValue,
	type BlurSize,
	FilterBuilder,
} from "./builders/FilterBuilder";
import {
	type FlexDirection,
	type FlexGrowValue,
	type FlexShrinkValue,
	type FlexValue,
	type ItemsAlign,
	type JustifyAlign,
	LayoutBuilder,
	type PlaceItemsAlign,
} from "./builders/LayoutBuilder";
import { ListBuilder, type ListStyleType } from "./builders/ListBuilder";
import {
	ObjectBuilder,
	type ObjectFit,
	type ObjectPosition,
} from "./builders/ObjectBuilder";
import {
	type BgOpacityValue,
	OpacityBuilder,
	type OpacityValue,
	type TextOpacityValue,
} from "./builders/OpacityBuilder";
import {
	OverflowBuilder,
	type OverflowType,
	type OverflowXType,
	type OverflowYType,
} from "./builders/OverflowBuilder";
import {
	type InsetSize,
	type InsetXSize,
	type InsetYSize,
	type PointerEventsValue,
	PositionBuilder,
	type PositionValue,
	type ZIndexValue,
} from "./builders/PositionBuilder";
import {
	ShadowBuilder,
	type ShadowColor,
	type ShadowSize,
} from "./builders/ShadowBuilder";
import {
	type HeightSize,
	type MaxHeightSize,
	type MaxWidthSize,
	type MinHeightSize,
	type MinWidthSize,
	SizeBuilder,
	type WidthSize,
} from "./builders/SizeBuilder";
import type { SpaceXSize, SpaceYSize } from "./builders/SpaceBuilder";
import {
	type GapSize,
	type MarginBottomSize,
	type MarginLeftSize,
	type MarginRightSize,
	type MarginSize,
	type MarginTopSize,
	type MarginXSize,
	type MarginYSize,
	type PaddingBottomSize,
	type PaddingLeftSize,
	type PaddingRightSize,
	type PaddingSize,
	type PaddingTopSize,
	type PaddingXSize,
	type PaddingYSize,
	SpacingBuilder,
} from "./builders/SpacingBuilder";
import {
	type FontWeight,
	type LineHeight,
	type TextAlign,
	TextBuilder,
	type TextColor,
	type TextSize,
} from "./builders/TextBuilder";
import {
	type DurationValue,
	type EaseType,
	TransformBuilder,
	type TransformType,
	type TransitionType,
	type TranslateXValue,
	type TranslateYValue,
} from "./builders/TransformBuilder";

class ClassBuilder {
	// 统一的类名数组，保持调用顺序
	private classes: string[] = [];

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

	/**
	 * 添加 grid 布局
	 */
	grid(): this {
		const tempBuilder = new LayoutBuilder();
		tempBuilder.grid();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 place-items（同时设置 align-items 和 justify-items）
	 * @param align 对齐方式
	 */
	placeItems(align: PlaceItemsAlign): this {
		const tempBuilder = new LayoutBuilder();
		tempBuilder.placeItems(align);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 flex-grow
	 * @param value flex-grow 值
	 */
	flexGrow(value: FlexGrowValue): this {
		const tempBuilder = new LayoutBuilder();
		tempBuilder.flexGrow(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 flex-shrink
	 * @param value flex-shrink 值
	 */
	shrink(value: FlexShrinkValue): this {
		const tempBuilder = new LayoutBuilder();
		tempBuilder.shrink(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 shrink-0（不收缩）
	 */
	shrink0(): this {
		const tempBuilder = new LayoutBuilder();
		tempBuilder.shrink0();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 flex 值（flex-1, flex-auto 等）
	 * @param value flex 值
	 */
	flexValue(value: FlexValue): this {
		const tempBuilder = new LayoutBuilder();
		tempBuilder.flexValue(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 flex-1（自动填充剩余空间）
	 */
	flex1(): this {
		const tempBuilder = new LayoutBuilder();
		tempBuilder.flex1();
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

	/**
	 * 设置水平方向外边距（margin-left 和 margin-right）
	 * @param size 外边距大小
	 */
	mx(size: MarginXSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.mx(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置垂直方向外边距（margin-top 和 margin-bottom）
	 * @param size 外边距大小
	 */
	my(size: MarginYSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.my(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置顶部外边距
	 * @param size 外边距大小
	 */
	mt(size: MarginTopSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.mt(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置底部外边距
	 * @param size 外边距大小
	 */
	mb(size: MarginBottomSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.mb(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置左侧外边距
	 * @param size 外边距大小
	 */
	ml(size: MarginLeftSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.ml(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置右侧外边距
	 * @param size 外边距大小
	 */
	mr(size: MarginRightSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.mr(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置水平方向内边距（padding-left 和 padding-right）
	 * @param size 内边距大小
	 */
	px(size: PaddingXSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.px(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置垂直方向内边距（padding-top 和 padding-bottom）
	 * @param size 内边距大小
	 */
	py(size: PaddingYSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.py(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置顶部内边距
	 * @param size 内边距大小
	 */
	pt(size: PaddingTopSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.pt(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置底部内边距
	 * @param size 内边距大小
	 */
	pb(size: PaddingBottomSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.pb(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置左侧内边距
	 * @param size 内边距大小
	 */
	pl(size: PaddingLeftSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.pl(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置右侧内边距
	 * @param size 内边距大小
	 */
	pr(size: PaddingRightSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.pr(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置所有方向内边距
	 * @param size 内边距大小
	 */
	p(size: PaddingSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.p(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置所有方向外边距
	 * @param size 外边距大小
	 */
	m(size: MarginSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.margin(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置水平方向子元素间距
	 * @param size 间距大小
	 */
	spaceX(size: SpaceXSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.spaceX(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置垂直方向子元素间距
	 * @param size 间距大小
	 */
	spaceY(size: SpaceYSize): this {
		const tempBuilder = new SpacingBuilder();
		tempBuilder.spaceY(size);
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

	/**
	 * 设置字体粗细为 medium
	 */
	medium(): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.medium();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置字体粗细为 semibold
	 */
	semibold(): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.semibold();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置行高
	 * @param height 行高值
	 */
	leading(height: LineHeight): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.leading(height);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置行高为 relaxed
	 */
	leadingRelaxed(): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.leadingRelaxed();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置文本为斜体
	 */
	italic(): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.italic();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置文本下划线
	 */
	underline(): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.underline();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 移除文本下划线
	 */
	noUnderline(): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.noUnderline();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置文本截断（显示省略号）
	 */
	truncate(): this {
		const tempBuilder = new TextBuilder();
		tempBuilder.truncate();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 列表相关方法（委托给 ListBuilder） ==========

	/**
	 * 设置列表样式类型
	 * @param style 列表样式
	 */
	listStyle(style: ListStyleType): this {
		const tempBuilder = new ListBuilder();
		tempBuilder.listStyle(style);
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
	 * 设置透明度为 0（完全透明）
	 */
	opacity0(): this {
		const tempBuilder = new OpacityBuilder();
		tempBuilder.opacity0();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置透明度为 100（完全不透明）
	 */
	opacity100(): this {
		const tempBuilder = new OpacityBuilder();
		tempBuilder.opacity100();
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

	/**
	 * 设置 inset（top、right、bottom、left 同时设置）
	 * @param size inset 值
	 */
	inset(size: InsetSize): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.inset(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置水平方向 inset（left 和 right）
	 * @param size inset 值
	 */
	insetX(size: InsetXSize): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.insetX(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置垂直方向 inset（top 和 bottom）
	 * @param size inset 值
	 */
	insetY(size: InsetYSize): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.insetY(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 z-index 层级
	 * @param value z-index 值
	 */
	z(value: ZIndexValue): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.z(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 pointer-events 属性
	 * @param value pointer-events 值
	 */
	pointerEvents(value: PointerEventsValue): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.pointerEvents(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置顶部位置
	 * @param value 位置值
	 */
	top(value: PositionValue): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.top(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置右侧位置
	 * @param value 位置值
	 */
	right(value: PositionValue): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.right(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置底部位置
	 * @param value 位置值
	 */
	bottom(value: PositionValue): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.bottom(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置左侧位置
	 * @param value 位置值
	 */
	left(value: PositionValue): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.left(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置所有方向为 0
	 */
	inset0(): this {
		const tempBuilder = new PositionBuilder();
		tempBuilder.inset0();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 背景相关方法（委托给 BackgroundBuilder） ==========

	/**
	 * 设置背景色
	 * @param color 背景色值
	 */
	bg(color: BackgroundColor): this {
		const tempBuilder = new BackgroundBuilder();
		tempBuilder.bg(color);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 边框相关方法（委托给 BorderBuilder） ==========

	/**
	 * 设置边框宽度
	 * @param width 边框宽度值，不传参数则使用默认边框
	 */
	border(width?: BorderWidth): this {
		const tempBuilder = new BorderBuilder();
		tempBuilder.border(width);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置边框颜色
	 * @param color 边框颜色值
	 */
	borderColor(color: BorderColor): this {
		const tempBuilder = new BorderBuilder();
		tempBuilder.borderColor(color);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置圆角
	 * @param size 圆角大小，不传参数则使用默认圆角
	 */
	rounded(size?: RoundedSize): this {
		const tempBuilder = new BorderBuilder();
		tempBuilder.rounded(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置顶部圆角
	 * @param size 圆角大小，不传参数则使用默认圆角
	 */
	roundedTop(size?: RoundedTopSize): this {
		const tempBuilder = new BorderBuilder();
		tempBuilder.roundedTop(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置底部圆角
	 * @param size 圆角大小，不传参数则使用默认圆角
	 */
	roundedBottom(size?: RoundedBottomSize): this {
		const tempBuilder = new BorderBuilder();
		tempBuilder.roundedBottom(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置左侧圆角
	 * @param size 圆角大小，不传参数则使用默认圆角
	 */
	roundedLeft(size?: RoundedLeftSize): this {
		const tempBuilder = new BorderBuilder();
		tempBuilder.roundedLeft(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置右侧圆角
	 * @param size 圆角大小，不传参数则使用默认圆角
	 */
	roundedRight(size?: RoundedRightSize): this {
		const tempBuilder = new BorderBuilder();
		tempBuilder.roundedRight(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 阴影相关方法（委托给 ShadowBuilder） ==========

	/**
	 * 设置阴影大小
	 * @param size 阴影大小，不传参数则使用默认阴影
	 */
	shadow(size?: ShadowSize): this {
		const tempBuilder = new ShadowBuilder();
		tempBuilder.shadow(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置阴影颜色
	 * @param color 阴影颜色值
	 */
	shadowColor(color: ShadowColor): this {
		const tempBuilder = new ShadowBuilder();
		tempBuilder.shadowColor(color);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 显示相关方法（委托给 DisplayBuilder） ==========

	/**
	 * 设置显示类型
	 * @param type 显示类型值
	 */
	display(type: DisplayType): this {
		const tempBuilder = new DisplayBuilder();
		tempBuilder.display(type);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置为块级元素
	 */
	block(): this {
		const tempBuilder = new DisplayBuilder();
		tempBuilder.block();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置为行内块级元素
	 */
	inlineBlock(): this {
		const tempBuilder = new DisplayBuilder();
		tempBuilder.inlineBlock();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置为网格显示
	 */
	displayGrid(): this {
		const tempBuilder = new DisplayBuilder();
		tempBuilder.grid();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置为隐藏
	 */
	hidden(): this {
		const tempBuilder = new DisplayBuilder();
		tempBuilder.hidden();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 对象相关方法（委托给 ObjectBuilder） ==========

	/**
	 * 设置对象适配方式
	 * @param fit 对象适配值
	 */
	objectFit(fit: ObjectFit): this {
		const tempBuilder = new ObjectBuilder();
		tempBuilder.objectFit(fit);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置对象覆盖
	 */
	objectCover(): this {
		const tempBuilder = new ObjectBuilder();
		tempBuilder.objectCover();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置对象包含
	 */
	objectContain(): this {
		const tempBuilder = new ObjectBuilder();
		tempBuilder.objectContain();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置对象位置
	 * @param position 对象位置值
	 */
	objectPosition(position: ObjectPosition): this {
		const tempBuilder = new ObjectBuilder();
		tempBuilder.objectPosition(position);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 变换相关方法（委托给 TransformBuilder） ==========

	/**
	 * 设置 transform
	 * @param type transform 类型，不传参数则使用默认 transform
	 */
	transform(type?: TransformType): this {
		const tempBuilder = new TransformBuilder();
		tempBuilder.transform(type);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 transition
	 * @param type transition 类型，不传参数则使用默认 transition
	 */
	transition(type?: TransitionType): this {
		const tempBuilder = new TransformBuilder();
		tempBuilder.transition(type);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 transition-all
	 */
	transitionAll(): this {
		const tempBuilder = new TransformBuilder();
		tempBuilder.transitionAll();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置动画持续时间
	 * @param value 持续时间值（毫秒）
	 */
	duration(value: DurationValue): this {
		const tempBuilder = new TransformBuilder();
		tempBuilder.duration(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置缓动函数
	 * @param type 缓动类型
	 */
	ease(type: EaseType): this {
		const tempBuilder = new TransformBuilder();
		tempBuilder.ease(type);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 ease-in-out
	 */
	easeInOut(): this {
		const tempBuilder = new TransformBuilder();
		tempBuilder.easeInOut();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 X 轴平移
	 * @param value 平移值
	 */
	translateX(value: TranslateXValue): this {
		const tempBuilder = new TransformBuilder();
		tempBuilder.translateX(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 Y 轴平移
	 * @param value 平移值
	 */
	translateY(value: TranslateYValue): this {
		const tempBuilder = new TransformBuilder();
		tempBuilder.translateY(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 溢出相关方法（委托给 OverflowBuilder） ==========

	/**
	 * 设置溢出行为
	 * @param type 溢出类型
	 */
	overflow(type: OverflowType): this {
		const tempBuilder = new OverflowBuilder();
		tempBuilder.overflow(type);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置溢出为隐藏
	 */
	overflowHidden(): this {
		const tempBuilder = new OverflowBuilder();
		tempBuilder.overflowHidden();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置溢出为自动滚动
	 */
	overflowAuto(): this {
		const tempBuilder = new OverflowBuilder();
		tempBuilder.overflowAuto();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 X 轴溢出行为
	 * @param type 溢出类型
	 */
	overflowX(type: OverflowXType): this {
		const tempBuilder = new OverflowBuilder();
		tempBuilder.overflowX(type);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置 Y 轴溢出行为
	 * @param type 溢出类型
	 */
	overflowY(type: OverflowYType): this {
		const tempBuilder = new OverflowBuilder();
		tempBuilder.overflowY(type);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 鼠标样式相关方法（委托给 CursorBuilder） ==========

	/**
	 * 设置鼠标样式
	 * @param type 鼠标样式类型
	 */
	cursor(type: CursorType): this {
		const tempBuilder = new CursorBuilder();
		tempBuilder.cursor(type);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置鼠标样式为指针
	 */
	cursorPointer(): this {
		const tempBuilder = new CursorBuilder();
		tempBuilder.cursorPointer();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置鼠标样式为放大镜
	 */
	cursorZoomIn(): this {
		const tempBuilder = new CursorBuilder();
		tempBuilder.cursorZoomIn();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置鼠标样式为抓取
	 */
	cursorGrab(): this {
		const tempBuilder = new CursorBuilder();
		tempBuilder.cursorGrab();
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	// ========== 滤镜相关方法（委托给 FilterBuilder） ==========

	/**
	 * 设置背景模糊
	 * @param size 模糊大小，不传参数则使用默认模糊
	 */
	backdropBlur(size?: BackdropBlurSize): this {
		const tempBuilder = new FilterBuilder();
		tempBuilder.backdropBlur(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置模糊
	 * @param size 模糊大小，不传参数则使用默认模糊
	 */
	blur(size?: BlurSize): this {
		const tempBuilder = new FilterBuilder();
		tempBuilder.blur(size);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置背景饱和度
	 * @param value 饱和度值
	 */
	backdropSaturate(value: BackdropSaturateValue): this {
		const tempBuilder = new FilterBuilder();
		tempBuilder.backdropSaturate(value);
		this.classes.push(...tempBuilder.getClasses());
		return this;
	}

	/**
	 * 设置背景亮度
	 * @param value 亮度值
	 */
	backdropBrightness(value: BackdropBrightnessValue): this {
		const tempBuilder = new FilterBuilder();
		tempBuilder.backdropBrightness(value);
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
	 * @returns 类名字符串（自动去重）
	 */
	build(): string {
		// 使用 Set 去重，同时保持第一次出现的顺序
		return Array.from(new Set(this.classes.filter(Boolean))).join(" ");
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
