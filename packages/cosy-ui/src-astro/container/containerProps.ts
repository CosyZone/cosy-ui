import type { HTMLAttributes } from "astro/types";
import type { ImageMetadata } from "astro";
import type { BackgroundColor } from "../../src/common/backgrounds";
import type { BorderSize, BorderColor } from "../../src/common/border";
import type { Size } from "../../src/common/size";
import type { HeightSize } from "../../src/common/height";
import type {
	FlexDirection,
	GapSize,
	FlexAlign,
	FlexJustify,
} from "../../src/common/layout";
import type { PaddingSize } from "../../src/common/padding";
import type { MarginSize } from "../../src/common/margin";
import type { RoundedSize } from "../../src/common/rounded";
import type { FitMode } from "../../src/common/fitmode";
import type { ContentBorderColor } from "./contentBorderColors";
import type { IContainerPropsBase } from "../../src/components/container/containerPropsBase";

// 定义 ImageSource 类型
type ImageSource = ImageMetadata | string;

/**
 * Container 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface IContainerProps extends IContainerPropsBase, HTMLAttributes<"div"> {
	/**
	 * 宽高比（宽/高），设置后容器会保持这个比例
	 */
	aspectRatio?: number;

	/**
	 * 背景图片源（本地 ImageMetadata 或 远程 URL）。提供时会用图片铺底作为背景
	 */
	backgroundImage?: ImageSource;

	/**
	 * 边框尺寸
	 * @default "none"
	 */
	border?: BorderSize;

	/**
	 * 边框颜色，支持所有预定义的颜色和透明度变体
	 */
	borderColor?: BorderColor;

	/**
	 * 内容适配模式：none（默认）、contain（保持比例，尽量占满且不溢出）、cover（保持比例，铺满并可能裁剪）
	 */
	fit?: FitMode;

	/**
	 * 是否给内容比例盒加边框（仅在 fit 模式下生效）
	 */
	contentBorder?: boolean | ContentBorderColor;

	/**
	 * 是否让内部内容居中显示
	 * @default false
	 */
	contentCentered?: boolean;

	/**
	 * 容器高度，不设置则不设置高度
	 */
	height?: HeightSize;

	/**
	 * 外边距大小
	 * @default "none"
	 */
	margin?: MarginSize;

	/**
	 * 垂直内边距（上下）
	 */
	py?: PaddingSize;

	/**
	 * 顶部内边距
	 */
	pt?: PaddingSize;

	/**
	 * 底部内边距
	 */
	pb?: PaddingSize;

	/**
	 * 水平内边距（左右）
	 */
	px?: PaddingSize;

	/**
	 * 左侧内边距
	 */
	pl?: PaddingSize;

	/**
	 * 右侧内边距
	 */
	pr?: PaddingSize;
}

// 为了解决 class 属性冲突，我们重新定义所有属性
export interface IContainerProps extends Omit<IContainerPropsBase, 'class'>, HTMLAttributes<"div"> {
	/**
	 * 宽高比（宽/高），设置后容器会保持这个比例
	 */
	aspectRatio?: number;

	/**
	 * 背景图片源（本地 ImageMetadata 或 远程 URL）。提供时会用图片铺底作为背景
	 */
	backgroundImage?: ImageSource;

	/**
	 * 边框尺寸
	 * @default "none"
	 */
	border?: BorderSize;

	/**
	 * 边框颜色，支持所有预定义的颜色和透明度变体
	 */
	borderColor?: BorderColor;

	/**
	 * 内容适配模式：none（默认）、contain（保持比例，尽量占满且不溢出）、cover（保持比例，铺满并可能裁剪）
	 */
	fit?: FitMode;

	/**
	 * 是否给内容比例盒加边框（仅在 fit 模式下生效）
	 */
	contentBorder?: boolean | ContentBorderColor;

	/**
	 * 是否居中显示
	 * @default true
	 */
	centered?: boolean;

	/**
	 * 是否让内部内容居中显示
	 * @default false
	 */
	contentCentered?: boolean;

	/**
	 * 自定义类名
	 */
	class?: string;

	/**
	 * flex布局方向，不设置则不启用flex布局
	 */
	flex?: FlexDirection;

	/**
	 * flex项目间距
	 * @default "none"
	 */
	gap?: GapSize;

	/**
	 * 容器高度，不设置则不设置高度
	 */
	height?: HeightSize;

	/**
	 * flex项目水平对齐方式
	 */
	items?: FlexAlign;

	/**
	 * flex项目垂直对齐方式
	 */
	justify?: FlexJustify;

	/**
	 * 外边距大小
	 * @default "none"
	 */
	margin?: MarginSize;

	/**
	 * 内边距大小
	 * @default "md"
	 */
	padding?: PaddingSize;

	/**
	 * 垂直内边距（上下）
	 */
	py?: PaddingSize;

	/**
	 * 顶部内边距
	 */
	pt?: PaddingSize;

	/**
	 * 底部内边距
	 */
	pb?: PaddingSize;

	/**
	 * 水平内边距（左右）
	 */
	px?: PaddingSize;

	/**
	 * 左侧内边距
	 */
	pl?: PaddingSize;

	/**
	 * 右侧内边距
	 */
	pr?: PaddingSize;

	/**
	 * （推荐）容器宽度（与 Astro 版本保持一致）
	 * 与 size 等价；如同时传入，优先使用 width
	 */
	width?: Size;

	/**
	 * 圆角大小
	 * @default "none"
	 */
	rounded?: RoundedSize;

	/**
	 * 预设的语义化背景色，支持 DaisyUI 主题系统
	 * 包含透明度设置，使用 Tailwind v4 语法：bg-color/opacity
	 * @default undefined
	 */
	background?: BackgroundColor;
}

export interface IContainerPropsBuilder {
	/** 设置宽高比（宽/高）。
	 * @param value 宽高比（宽/高），如 16/9、4/3、1
	 * @returns IContainerPropsBuilder
	 */
	aspectRatio(value: number): IContainerPropsBuilder;

	/** 设置背景色类型（common/backgrounds 中的 BackgroundColor）。
	 * @param value 背景色键名，如 primary/10、base-100
	 * @returns IContainerPropsBuilder
	 */
	background(
		value: NonNullable<IContainerProps["background"]>,
	): IContainerPropsBuilder;

	/** 设置背景图片源。
	 * @param value 本地 ImageMetadata 或远程 URL
	 * @returns IContainerPropsBuilder
	 */
	backgroundImage(
		value: NonNullable<IContainerProps["backgroundImage"]>,
	): IContainerPropsBuilder;

	/** 设置边框尺寸。
	 * @param value 边框尺寸，可选值：none、sm、md、lg、xl
	 * @returns IContainerPropsBuilder
	 */
	border(value: NonNullable<IContainerProps["border"]>): IContainerPropsBuilder;

	/** 内容适配模式（none/contain/cover）。
	 * @param value 适配模式
	 * @returns IContainerPropsBuilder
	 */
	fit(value: NonNullable<IContainerProps["fit"]>): IContainerPropsBuilder;

	/** 内容比例盒是否显示边框或使用特定颜色。
	 * @param value true/颜色键名，省略则为 true
	 * @returns IContainerPropsBuilder
	 */
	contentBorder(
		value?: boolean | NonNullable<IContainerProps["contentBorder"]>,
	): IContainerPropsBuilder;

	/** 是否整体居中显示（容器居中）。
	 * @param value 省略则为 true
	 * @returns IContainerPropsBuilder
	 */
	centered(value?: boolean): IContainerPropsBuilder;

	/** 是否让内部内容居中（flex 居中）。
	 * @param value 省略则为 true
	 * @returns IContainerPropsBuilder
	 */
	contentCentered(value?: boolean): IContainerPropsBuilder;

	/** 自定义类名。
	 * @param value class 字符串
	 * @returns IContainerPropsBuilder
	 */
	class(value: string): IContainerPropsBuilder;

	/** Flex 方向。
	 * @param value row|col|row-reverse|col-reverse
	 * @returns IContainerPropsBuilder
	 */
	flex(value: NonNullable<IContainerProps["flex"]>): IContainerPropsBuilder;

	/** Flex gap。
	 * @param value 预设 gap 尺寸
	 * @returns IContainerPropsBuilder
	 */
	gap(value: NonNullable<IContainerProps["gap"]>): IContainerPropsBuilder;

	/** 高度。
	 * @param value 预设高度尺寸
	 * @returns IContainerPropsBuilder
	 */
	height(value: NonNullable<IContainerProps["height"]>): IContainerPropsBuilder;

	/** items 对齐。
	 * @param value start|end|center|baseline|stretch
	 * @returns IContainerPropsBuilder
	 */
	items(value: NonNullable<IContainerProps["items"]>): IContainerPropsBuilder;

	/** justify 对齐。
	 * @param value start|end|center|between|around|evenly
	 * @returns IContainerPropsBuilder
	 */
	justify(
		value: NonNullable<IContainerProps["justify"]>,
	): IContainerPropsBuilder;

	/** 外边距。
	 * @param value 预设 margin 尺寸
	 * @returns IContainerPropsBuilder
	 */
	margin(value: NonNullable<IContainerProps["margin"]>): IContainerPropsBuilder;

	/** 内边距。
	 * @param value 预设 padding 尺寸
	 * @returns IContainerPropsBuilder
	 */
	padding(
		value: NonNullable<IContainerProps["padding"]>,
	): IContainerPropsBuilder;

	/** 圆角。
	 * @param value 预设 rounded 尺寸
	 * @returns IContainerPropsBuilder
	 */
	rounded(
		value: NonNullable<IContainerProps["rounded"]>,
	): IContainerPropsBuilder;

	/** 宽度最大值。
	 * @param value xs|sm|md|lg|xl|full
	 * @returns IContainerPropsBuilder
	 */
	width(value: NonNullable<IContainerProps["width"]>): IContainerPropsBuilder;

	/** 返回构建完成的 Props 对象。
	 * @returns IContainerProps
	 */
	build(): IContainerProps;
}

/**
 * 以链式方式构建 Container 的 Props。
 * 用法：
 *   const props = ContainerProps().width('md').padding('lg').build();
 */
export function createContainerProps(
	initial: Partial<IContainerProps> = {},
): IContainerPropsBuilder {
	// 不在构建器中注入默认值，保留调用方显式设置的键。
	// 默认值由 Container 组件自身在解构时提供，避免被误认为“用户显式设置”。
	let props: IContainerProps = {
		...initial,
	} as any;

	const api: IContainerPropsBuilder = {
		/** @inheritDoc IContainerPropsBuilder.aspectRatio */
		aspectRatio(value) {
			props = { ...props, aspectRatio: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.background */
		background(value) {
			props = { ...props, background: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.backgroundImage */
		backgroundImage(value) {
			props = { ...props, backgroundImage: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.border */
		border(value) {
			props = { ...props, border: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.fit */
		fit(value) {
			props = { ...props, fit: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.contentBorder */
		contentBorder(value = true) {
			props = { ...props, contentBorder: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.centered */
		centered(value = true) {
			props = { ...props, centered: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.contentCentered */
		contentCentered(value = true) {
			props = { ...props, contentCentered: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.class */
		class(value) {
			props = { ...props, class: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.flex */
		flex(value) {
			props = { ...props, flex: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.gap */
		gap(value) {
			props = { ...props, gap: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.height */
		height(value) {
			props = { ...props, height: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.items */
		items(value) {
			props = { ...props, items: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.justify */
		justify(value) {
			props = { ...props, justify: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.margin */
		margin(value) {
			props = { ...props, margin: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.padding */
		padding(value) {
			props = { ...props, padding: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.rounded */
		rounded(value) {
			props = { ...props, rounded: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.width */
		width(value) {
			props = { ...props, width: value };
			return api;
		},
		/** @inheritDoc IContainerPropsBuilder.build */
		build() {
			return props;
		},
	};

	return api;
}

// 对外导出一致的命名（值）
export const ContainerProps = createContainerProps;