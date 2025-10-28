/**
 * AlertFactory - Alert 组件的工厂类
 *
 * 提供链式调用的方式来创建 Alert 组件实例。
 * 支持静态方法和实例方法的链式调用。
 *
 * @example
 * ```typescript
 * // 静态方法链式调用
 * const element = AlertFactory.withTitle('Hello World').build();
 *
 * // 实例方法链式调用
 * const element = AlertFactory.create()
 *   .withTitle('操作成功')
 *   .withType('success')
 *   .withDescription('您的操作已完成')
 *   .build();
 *
 * // 在 Astro 组件中使用
 * <element />
 * ```
 */

import type { IAlertProps } from "./props";
import { AlertPropsBuilder } from "../../src/components/alert/AlertPropsBuilder";

/**
 * Alert 组件工厂类
 */
export class AlertFactory {
	private builder: AlertPropsBuilder;

	constructor(builder?: AlertPropsBuilder) {
		this.builder = builder || new AlertPropsBuilder();
	}

	/**
	 * 创建新的 AlertFactory 实例
	 */
	static create(): AlertFactory {
		return new AlertFactory();
	}

	/**
	 * 设置标题（静态方法）
	 * @param title 标题文本
	 */
	static withTitle(title: string): AlertFactory {
		return new AlertFactory().withTitle(title);
	}

	/**
	 * 设置类型（静态方法）
	 * @param type 提示类型
	 */
	static withType(
		type: "info" | "success" | "warning" | "error",
	): AlertFactory {
		return new AlertFactory().withType(type);
	}

	/**
	 * 设置描述（静态方法）
	 * @param description 描述文本
	 */
	static withDescription(description: string): AlertFactory {
		return new AlertFactory().withDescription(description);
	}

	/**
	 * 设置为信息类型（静态方法）
	 */
	static info(): AlertFactory {
		return new AlertFactory().info();
	}

	/**
	 * 设置为成功类型（静态方法）
	 */
	static success(): AlertFactory {
		return new AlertFactory().success();
	}

	/**
	 * 设置为警告类型（静态方法）
	 */
	static warning(): AlertFactory {
		return new AlertFactory().warning();
	}

	/**
	 * 设置为错误类型（静态方法）
	 */
	static error(): AlertFactory {
		return new AlertFactory().error();
	}

	// ========== 实例方法 ==========

	/**
	 * 设置标题
	 * @param title 标题文本
	 */
	withTitle(title: string): AlertFactory {
		this.builder.title(title);
		return this;
	}

	/**
	 * 设置类型
	 * @param type 提示类型
	 */
	withType(type: "info" | "success" | "warning" | "error"): AlertFactory {
		this.builder.type(type);
		return this;
	}

	/**
	 * 设置描述
	 * @param description 描述文本
	 */
	withDescription(description: string): AlertFactory {
		this.builder.description(description);
		return this;
	}

	/**
	 * 设置自定义类名
	 * @param className 自定义类名
	 */
	withClass(className: string): AlertFactory {
		this.builder.class(className);
		return this;
	}

	/**
	 * 设置是否可关闭
	 * @param closable 是否可关闭
	 */
	withClosable(closable: boolean): AlertFactory {
		this.builder.closable(closable);
		return this;
	}

	/**
	 * 设置是否显示图标
	 * @param showIcon 是否显示图标
	 */
	withShowIcon(showIcon: boolean): AlertFactory {
		this.builder.showIcon(showIcon);
		return this;
	}

	/**
	 * 设置垂直外边距
	 * @param marginY 垂直外边距大小
	 */
	withMarginY(marginY: "xs" | "sm" | "md" | "lg" | "xl"): AlertFactory {
		this.builder.marginY(marginY);
		return this;
	}

	/**
	 * 设置样式变体
	 * @param variant 样式变体
	 */
	withVariant(variant: "solid" | "outline" | "dash" | "soft"): AlertFactory {
		this.builder.variant(variant);
		return this;
	}

	/**
	 * 设置为信息类型
	 */
	info(): AlertFactory {
		this.builder.info();
		return this;
	}

	/**
	 * 设置为成功类型
	 */
	success(): AlertFactory {
		this.builder.success();
		return this;
	}

	/**
	 * 设置为警告类型
	 */
	warning(): AlertFactory {
		this.builder.warning();
		return this;
	}

	/**
	 * 设置为错误类型
	 */
	error(): AlertFactory {
		this.builder.error();
		return this;
	}

	/**
	 * 批量设置属性
	 * @param props 属性对象
	 */
	withProps(props: Partial<IAlertProps>): AlertFactory {
		this.builder.merge(props);
		return this;
	}

	/**
	 * 构建 Alert 组件实例
	 * @returns Alert 组件实例
	 */
	async build(): Promise<any> {
		const props = this.builder.build();

		// 使用 Astro 容器 API 渲染组件
		const { experimental_AstroContainer } = await import("astro/container");
		const container = await experimental_AstroContainer.create();

		// 导入 Alert 组件
		const Alert = (await import("./Alert.astro")).default;

		// 渲染为 HTML 字符串
		const html = await container.renderToString(Alert, { props });
		return html;
	}

	/**
	 * 构建 props 对象（用于直接传递给 Alert 组件）
	 * @returns props 对象
	 */
	buildProps(): Partial<IAlertProps> {
		return this.builder.build();
	}
}

// 导入 Alert 组件类型
import Alert from "./Alert.astro";
