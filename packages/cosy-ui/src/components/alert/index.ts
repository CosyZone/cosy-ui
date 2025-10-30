import type { IAlertPropsBase } from "./alertPropsBase";
import { getBaseAlertClasses } from "./class-all";
import { type IAlertRenderOptions, renderAlert } from "./renderAlert";

/**
 * Alert 门面对象 - 统一的 Alert 组件接口
 *
 * 该门面提供所有 Alert 相关的功能，适用于不同的使用场景：
 * - SSR 框架（如 Astro）: 使用 AlertFacade.render()
 * - CSR 框架（如 Vue/React）: 使用 AlertFacade.getClassString()
 *
 * @example
 * ```typescript
 * // Astro 中使用
 * const html = AlertFacade.render(
 *   { type: 'info', title: '提示' },
 *   { defaultSlotHtml: '内容', iconHtml: '<svg>...</svg>' }
 * );
 *
 * // Vue/React 中使用
 * const className = AlertFacade.getClassString({ type: 'info', variant: 'solid' });
 *
 * // 获取类名数组（高级用法）
 * const classes = AlertFacade.getClasses({ type: 'success' });
 * ```
 */
export const AlertFacade = {
	/**
	 * 渲染完整的 Alert HTML 字符串（框架无关）
	 * 适用于 SSR 框架如 Astro
	 *
	 * @param props - Alert 组件的属性
	 * @param options - 渲染选项（包含已渲染的图标和 slot 内容）
	 * @returns 完整的 Alert HTML 字符串
	 */
	render: renderAlert,

	/**
	 * 获取 Alert 的类名数组
	 * 适用于需要精细控制类名的场景
	 *
	 * @param props - Alert 组件的属性
	 * @returns 类名数组
	 */
	getClasses: getBaseAlertClasses,

	/**
	 * 获取 Alert 的类名字符串（便捷方法）
	 * 适用于 CSR 框架如 Vue/React
	 *
	 * @param props - Alert 组件的属性
	 * @returns 组合后的类名字符串
	 */
	getClassString: (props: IAlertPropsBase): string => {
		return getBaseAlertClasses(props).filter(Boolean).join(" ");
	},
} as const;

/**
 * Alert 组件的属性接口
 */
export type { IAlertPropsBase };
export type { IAlertRenderOptions };
