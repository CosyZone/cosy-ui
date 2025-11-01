import {
	getError403Classes,
	getError404Classes,
	getError500Classes,
	getError503Classes,
} from "./class-all";
import type {
	IError403Props,
	IError404Props,
	IError500Props,
	IError503Props,
} from "./errorPropsBase";

/**
 * 错误页面门面对象 - 统一的错误页面组件接口
 *
 * 该门面提供所有错误页面相关的功能，适用于不同的使用场景：
 * - SSR 框架（如 Astro）: 直接使用类名
 * - CSR 框架（如 Vue/React）: 使用门面获取类名
 *
 * @example
 * ```typescript
 * // Vue 中使用
 * const classes = ErrorPageFacade.getError404Classes({ debugKVs: {...} });
 * ```
 */
export const ErrorPageFacade = {
	/**
	 * 获取 Error403 的类名
	 * @param props - Error403 组件的属性
	 * @returns 类名对象
	 */
	getError403Classes,

	/**
	 * 获取 Error404 的类名
	 * @param props - Error404 组件的属性
	 * @returns 类名对象
	 */
	getError404Classes,

	/**
	 * 获取 Error500 的类名
	 * @param props - Error500 组件的属性
	 * @returns 类名对象
	 */
	getError500Classes,

	/**
	 * 获取 Error503 的类名
	 * @param props - Error503 组件的属性
	 * @returns 类名对象
	 */
	getError503Classes,
} as const;

/**
 * 错误页面组件的属性接口
 */
export type { IError403Props, IError404Props, IError500Props, IError503Props };
