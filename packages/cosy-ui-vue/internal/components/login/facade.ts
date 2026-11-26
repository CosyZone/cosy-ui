import { getLoginClasses, getSocialButtonClass } from "./class-all";
import type { ILoginPropsBase } from "./loginPropsBase";

/**
 * Login 门面对象 - 统一的 Login 组件接口
 *
 * 该门面提供所有 Login 相关的功能，适用于不同的使用场景：
 * - SSR 框架（如 Astro）: 直接使用类名
 * - CSR 框架（如 Vue/React）: 使用门面获取类名
 *
 * @example
 * ```typescript
 * // Vue 中使用
 * const classes = LoginFacade.getLoginClasses({ title: '登录', ... });
 * const githubButtonClass = LoginFacade.getSocialButtonClass('github');
 * ```
 */
export const LoginFacade = {
	/**
	 * 获取 Login 的类名
	 * @param props - Login 组件的属性
	 * @returns 类名对象
	 */
	getLoginClasses,

	/**
	 * 获取社交登录按钮的类名
	 * @param provider - 社交登录提供商
	 * @returns 类名字符串
	 */
	getSocialButtonClass,
} as const;

/**
 * Login 组件的属性接口
 */
export type { ILoginPropsBase };
