import type { ICarouselItem, ICarouselProps } from "./types";

export interface ICarouselPropsBuilder {
	/**
	 * 轮播项列表
	 */
	items(value: ICarouselItem[]): ICarouselPropsBuilder;
	/**
	 * 锚点 id 前缀，确保同页多实例不冲突
	 * @default 'carousel'
	 */
	idPrefix(
		value: NonNullable<ICarouselProps["idPrefix"]>,
	): ICarouselPropsBuilder;
	/**
	 * 导航按钮类名（daisyUI 按钮）
	 * @default 'btn btn-circle'
	 */
	navButtonClass(
		value: NonNullable<ICarouselProps["navButtonClass"]>,
	): ICarouselPropsBuilder;
	/**
	 * 是否显示上一页/下一页导航按钮
	 * @default true
	 */
	showNav(value?: boolean): ICarouselPropsBuilder;
	/** 根元素 id */
	id(value: NonNullable<ICarouselProps["id"]>): ICarouselPropsBuilder;
	/** 追加的类名 */
	class(value: NonNullable<ICarouselProps["class"]>): ICarouselPropsBuilder;
	/** Astro 的 class:list 语法 */
	classList(
		value: NonNullable<ICarouselProps["class:list"]>,
	): ICarouselPropsBuilder;
	/** 构建并返回完整的 Carousel 组件 Props */
	build(): ICarouselProps;
}

export function createCarouselProps(
	initial: Partial<ICarouselProps> = {},
): ICarouselPropsBuilder {
	let props: ICarouselProps = {
		items: [],
		idPrefix: "carousel",
		navButtonClass: "btn btn-circle",
		showNav: true,
		...initial,
	} as ICarouselProps;

	const api: ICarouselPropsBuilder = {
		items(value) {
			props = { ...props, items: value };
			return api;
		},
		idPrefix(value) {
			props = { ...props, idPrefix: value };
			return api;
		},
		navButtonClass(value) {
			props = { ...props, navButtonClass: value };
			return api;
		},
		showNav(value = true) {
			props = { ...props, showNav: value };
			return api;
		},
		id(value) {
			props = { ...props, id: value };
			return api;
		},
		class(value) {
			props = { ...props, class: value };
			return api;
		},
		classList(value) {
			props = { ...props, "class:list": value };
			return api;
		},
		build() {
			return props;
		},
	};

	return api;
}

export const CarouselProps = createCarouselProps;
