import type { IContainerProps } from "./Container.astro";

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
