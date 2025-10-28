/**
 * AlertPropsBuilder - Alert 组件的 Props 构建器
 *
 * 提供链式调用的方式来构建 Alert 组件的 props。
 *
 * @example
 * ```typescript
 * // 基础用法
 * const props = alertProps().info().build();
 *
 * // 链式调用多个属性
 * const props = alertProps()
 *   .success()
 *   .title("操作成功")
 *   .closable(false)
 *   .build();
 *
 * // 使用快捷静态方法
 * const props = alertProps.error().title("错误").build();
 * ```
 */

import { PropsBuilder } from "../../utils/PropsBuilder";
import type { IAlertPropsBase } from "./alertPropsBase";
import type { MarginSize } from "../../common/margin";

export class AlertPropsBuilder extends PropsBuilder<IAlertPropsBase> {
	// ========== type 相关方法 ==========

	/**
	 * 设置提示类型
	 * @param value 提示类型
	 */
	type(value: "info" | "success" | "warning" | "error"): this {
		return this.set("type", value);
	}

	/**
	 * 设置为信息提示类型
	 */
	info(): this {
		return this.type("info");
	}

	/**
	 * 设置为成功提示类型
	 */
	success(): this {
		return this.type("success");
	}

	/**
	 * 设置为警告提示类型
	 */
	warning(): this {
		return this.type("warning");
	}

	/**
	 * 设置为错误提示类型
	 */
	error(): this {
		return this.type("error");
	}

	// ========== 其他属性方法 ==========

	/**
	 * 设置提示标题
	 * @param value 标题文本
	 */
	title(value: string): this {
		return this.set("title", value);
	}

	/**
	 * 设置描述文本
	 * @param value 描述文本
	 */
	description(value: string): this {
		return this.set("description", value);
	}

	/**
	 * 设置自定义 CSS 类名
	 * @param value CSS 类名
	 */
	class(value: string): this {
		return this.set("class", value);
	}

	/**
	 * 设置是否可关闭
	 * @param value 是否可关闭
	 */
	closable(value: boolean): this {
		return this.set("closable", value);
	}

	/**
	 * 设置是否显示图标
	 * @param value 是否显示图标
	 */
	showIcon(value: boolean): this {
		return this.set("showIcon", value);
	}

	/**
	 * 设置样式变体
	 * @param value 样式变体
	 */
	variant(value: "solid" | "outline" | "dash" | "soft"): this {
		return this.set("variant", value);
	}

	/**
	 * 设置垂直方向外边距
	 * @param value 外边距大小
	 */
	marginY(value: MarginSize): this {
		return this.set("marginY", value);
	}
}

/**
 * 创建一个新的 AlertPropsBuilder 实例
 * @returns AlertPropsBuilder 实例
 *
 * @example
 * ```typescript
 * const props = alertProps()
 *   .success()
 *   .title("成功")
 *   .build();
 * ```
 */
export function alertProps(): AlertPropsBuilder {
	return new AlertPropsBuilder();
}

// 为工厂函数添加快捷静态方法
alertProps.info = () => alertProps().info();
alertProps.success = () => alertProps().success();
alertProps.warning = () => alertProps().warning();
alertProps.error = () => alertProps().error();
