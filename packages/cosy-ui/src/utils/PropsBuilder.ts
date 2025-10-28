/**
 * PropsBuilder - 组件属性构建器基类
 *
 * @description
 * Props Builder 是 CosyUI 的内部工具，提供链式调用的方式来构建组件 props。
 * 使组件使用更加优雅、类型安全且易于维护。
 *
 * @internal 仅供 CosyUI 内部开发使用，不对外部用户暴露
 *
 * @example
 * ```typescript
 * // 1. 创建组件专用 Builder
 * import { PropsBuilder } from '@coffic/cosy-ui/utils/PropsBuilder';
 * import type { IAlertPropsBase } from './alertPropsBase';
 *
 * export class AlertPropsBuilder extends PropsBuilder<IAlertPropsBase> {
 *   type(value: "info" | "success" | "warning" | "error"): this {
 *     return this.set("type", value);
 *   }
 *
 *   // 快捷方法
 *   info(): this { return this.type("info"); }
 *   success(): this { return this.type("success"); }
 *
 *   title(value: string): this {
 *     return this.set("title", value);
 *   }
 * }
 *
 * // 2. 创建工厂函数
 * export function alertProps(): AlertPropsBuilder {
 *   return new AlertPropsBuilder();
 * }
 *
 * // 3. 添加静态快捷方法
 * alertProps.info = () => alertProps().info();
 * alertProps.success = () => alertProps().success();
 *
 * // 4. 在组件中使用
 * const props = alertProps()
 *   .success()
 *   .title("操作成功")
 *   .description("您的更改已保存")
 *   .build();
 *
 * // 5. 在 Astro 组件中使用
 * <Alert {...alertProps().success().title("成功").build()}>
 *   详细信息
 * </Alert>
 * ```
 *
 * @architecture
 * ```
 * PropsBuilder (基类 - 本文件)
 *     ↓ 继承
 * AlertPropsBuilder (Alert 专用 - src/components/alert/AlertPropsBuilder.ts)
 * AppLayoutPropsBuilder (AppLayout 专用 - src/components/layout-app/AppLayoutPropsBuilder.ts)
 * ButtonPropsBuilder (未来的其他组件...)
 * ```
 *
 * @导出结构
 * 1. 通用基类: src/utils/PropsBuilder.ts (本文件)
 * 2. 组件专用 Builder: src/components/{component}/{Component}PropsBuilder.ts
 * 3. 组件 index.ts 导出: src-astro/{component}/index.ts 导出 {component}Props
 * 4. 主入口自动导出: index-astro.ts 使用 export * 自动包含
 *
 * @设计模式
 * - **Builder 模式**: 分步构建复杂对象，支持链式调用
 * - **模板方法模式**: 基类定义框架，子类实现具体方法
 * - **Fluent Interface**: 所有方法返回 this 支持链式调用
 *
 * @类型安全
 * - 使用 TypeScript 泛型 `<T>` 确保类型安全
 * - `Partial<T>` 使所有属性可选
 * - `protected set()` 只允许子类使用
 * - `build()` 返回不可变的浅拷贝
 *
 * @扩展新组件
 * ```typescript
 * // 在 src/components/button/ButtonPropsBuilder.ts 中
 * import { PropsBuilder } from '../../utils/PropsBuilder';
 * import type { IButtonPropsBase } from './buttonPropsBase';
 *
 * export class ButtonPropsBuilder extends PropsBuilder<IButtonPropsBase> {
 *   variant(value: 'primary' | 'secondary'): this {
 *     return this.set('variant', value);
 *   }
 *
 *   primary(): this { return this.variant('primary'); }
 * }
 *
 * export function buttonProps(): ButtonPropsBuilder {
 *   return new ButtonPropsBuilder();
 * }
 *
 * buttonProps.primary = () => buttonProps().primary();
 * ```
 *
 * 在 src-astro/button/index.ts 中导出:
 * ```typescript
 * export {
 *   ButtonPropsBuilder,
 *   buttonProps,
 * } from "../../src/components/button/ButtonPropsBuilder";
 * ```
 *
 * @命名规范
 * - Builder 类: {ComponentName}PropsBuilder (如 AlertPropsBuilder)
 * - 工厂函数: {componentName}Props (如 alertProps)
 * - 文件名: {ComponentName}PropsBuilder.ts
 * - 文件位置: src/components/{component}/{ComponentName}PropsBuilder.ts
 *
 * @最佳实践
 * 1. 优先使用快捷方法: alertProps().success() 而不是 alertProps().type('success')
 * 2. 保持链式调用可读性: 每个方法调用独立一行
 * 3. 合理使用 merge(): 批量设置或合并已有 props 时使用
 * 4. 为常用值提供快捷方法: 提高开发体验
 * 5. 保持方法名与 prop 名称一致: 降低学习成本
 */

/**
 * Props Builder 基类
 *
 * @template T - 组件 props 接口类型，必须是对象类型
 *
 * @example
 * ```typescript
 * interface IMyComponentProps {
 *   title: string;
 *   size: 'sm' | 'md' | 'lg';
 *   disabled?: boolean;
 * }
 *
 * class MyComponentPropsBuilder extends PropsBuilder<IMyComponentProps> {
 *   title(value: string): this {
 *     return this.set('title', value);
 *   }
 *
 *   size(value: 'sm' | 'md' | 'lg'): this {
 *     return this.set('size', value);
 *   }
 * }
 * ```
 */
export class PropsBuilder<T extends Record<string, any>> {
	/**
	 * 内部 props 对象
	 * @private
	 */
	private props: Partial<T> = {};

	/**
	 * 设置单个属性值
	 *
	 * @param key - 属性名称
	 * @param value - 属性值
	 * @returns this - 支持链式调用
	 *
	 * @protected 只允许子类调用
	 *
	 * @example
	 * ```typescript
	 * class ButtonPropsBuilder extends PropsBuilder<IButtonProps> {
	 *   size(value: 'sm' | 'md' | 'lg'): this {
	 *     return this.set('size', value);
	 *   }
	 * }
	 * ```
	 */
	protected set<K extends keyof T>(key: K, value: T[K]): this {
		this.props[key] = value;
		return this;
	}

	/**
	 * 批量合并多个属性
	 *
	 * @param props - 要合并的属性对象
	 * @returns this - 支持链式调用
	 *
	 * @example
	 * ```typescript
	 * const baseProps = { class: 'my-alert', showIcon: false };
	 * alertProps()
	 *   .info()
	 *   .merge(baseProps)
	 *   .build();
	 * ```
	 */
	merge(props: Partial<T>): this {
		Object.assign(this.props, props);
		return this;
	}

	/**
	 * 构建最终的 props 对象
	 *
	 * @returns 返回 props 的浅拷贝，防止外部修改
	 *
	 * @example
	 * ```typescript
	 * const props = alertProps()
	 *   .success()
	 *   .title("操作成功")
	 *   .build();
	 *
	 * // props: { type: 'success', title: '操作成功' }
	 * ```
	 */
	build(): Partial<T> {
		return { ...this.props };
	}
}
