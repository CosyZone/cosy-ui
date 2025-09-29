import type { IAlertProps } from "./Alert.astro";

/**
 * 链式构建 Alert 的 Props 的 Builder 接口。
 * 在编辑器中输入 `AlertProps().` 可获得所有可用方法的提示与注释。
 */
export interface IAlertPropsBuilder {
	/** 设置提示类型（影响颜色与图标）。
	 * @param value info|success|warning|error
	 * @returns IAlertPropsBuilder
	 */
	type(value: NonNullable<IAlertProps["type"]>): IAlertPropsBuilder;
	/** 设置样式变体。
	 * @param value solid|outline|dash|soft
	 * @returns IAlertPropsBuilder
	 * */
	variant(value: NonNullable<IAlertProps["variant"]>): IAlertPropsBuilder;
	/** 设置标题文本。
	 * @param value 标题内容
	 * @returns IAlertPropsBuilder
	 */
	title(value: string): IAlertPropsBuilder;
	/** 设置描述文本（标题下方的小字）。
	 * @param value 描述内容
	 * @returns IAlertPropsBuilder
	 */
	description(value: string): IAlertPropsBuilder;
	/** 是否可关闭（默认 true）。
	 * @param value 省略则为 true
	 * @returns IAlertPropsBuilder
	 */
	closable(value?: boolean): IAlertPropsBuilder;
	/** 是否显示图标（默认 true）。
	 * @param value 省略则为 true
	 * @returns IAlertPropsBuilder
	 */
	showIcon(value?: boolean): IAlertPropsBuilder;
	/** 设置垂直外边距尺寸。
	 * @param value 预设尺寸键名
	 * @returns IAlertPropsBuilder
	 */
	marginY(value: NonNullable<IAlertProps["marginY"]>): IAlertPropsBuilder;
	/** 追加自定义类名。
	 * @param value class 字符串
	 * @returns IAlertPropsBuilder
	 */
	class(value: string): IAlertPropsBuilder;
	/** 返回构建完成的 Props 对象。
	 * @returns IAlertProps
	 */
	build(): IAlertProps;
}

/**
 * 以链式方式构建 Alert 的 Props。
 * 用法示例：
 *   const props = AlertProps().type('warning').variant('outline').build();
 */
export function createAlertProps(
	initial: Partial<IAlertProps> = {},
): IAlertPropsBuilder {
	let props: IAlertProps = {
		type: "info",
		variant: "solid",
		closable: true,
		showIcon: true,
		...initial,
	};

	const api: IAlertPropsBuilder = {
		/** @inheritDoc IAlertPropsBuilder.type */
		type(value) {
			props = { ...props, type: value };
			return api;
		},
		/** @inheritDoc IAlertPropsBuilder.variant */
		variant(value) {
			props = { ...props, variant: value };
			return api;
		},
		/** @inheritDoc IAlertPropsBuilder.title */
		title(value) {
			props = { ...props, title: value };
			return api;
		},
		/** @inheritDoc IAlertPropsBuilder.description */
		description(value) {
			props = { ...props, description: value };
			return api;
		},
		/** @inheritDoc IAlertPropsBuilder.closable */
		closable(value = true) {
			props = { ...props, closable: value };
			return api;
		},
		/** @inheritDoc IAlertPropsBuilder.showIcon */
		showIcon(value = true) {
			props = { ...props, showIcon: value };
			return api;
		},
		/** @inheritDoc IAlertPropsBuilder.marginY */
		marginY(value) {
			props = { ...props, marginY: value };
			return api;
		},
		/** @inheritDoc IAlertPropsBuilder.class */
		class(value) {
			props = { ...props, class: value };
			return api;
		},
		/** @inheritDoc IAlertPropsBuilder.build */
		build() {
			return props;
		},
	};

	return api;
}

export const AlertProps = createAlertProps;
