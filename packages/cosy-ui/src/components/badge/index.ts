import type { IBadgePropsBase } from "./badgePropsBase";
import { getBaseBadgeClasses } from "./class-all";
import { renderBadge } from "./renderBadge";

/**
 * Badge 门面对象 - 统一的 Badge 组件接口
 *
 * 该门面提供所有 Badge 相关的功能，适用于不同的使用场景：
 * - SSR 框架（如 Astro）: 使用 BadgeFacade.render()
 * - CSR 框架（如 Vue/React）: 使用 BadgeFacade.getClassString() 或 BadgeFacade.getClasses()
 *
 * @example
 * ```typescript
 * // Astro 中使用
 * const html = BadgeFacade.render({ variant: 'primary' }, 'Content');
 *
 * // Vue/React 中使用
 * const className = BadgeFacade.getClassString({ variant: 'primary' });
 *
 * // 高级用法 - 获取类名数组
 * const classes = BadgeFacade.getClasses({ variant: 'primary' });
 * ```
 */
export const BadgeFacade = {
	/**
	 * 渲染完整的 Badge HTML 字符串（框架无关）
	 * 适用于 SSR 框架如 Astro
	 *
	 * @param props - Badge 组件的属性
	 * @param slotContent - 已渲染的 slot 内容（HTML 字符串）
	 * @returns 完整的 Badge HTML 字符串
	 */
	render: renderBadge,

	/**
	 * 获取 Badge 的类名数组
	 * 适用于需要精细控制类名的场景
	 *
	 * @param props - Badge 组件的属性
	 * @returns 类名数组
	 */
	getClasses: getBaseBadgeClasses,

	/**
	 * 获取 Badge 的类名字符串（便捷方法）
	 * 适用于 CSR 框架如 Vue/React
	 *
	 * @param props - Badge 组件的属性
	 * @returns 组合后的类名字符串
	 */
	getClassString: (props: IBadgePropsBase): string => {
		return getBaseBadgeClasses(props).filter(Boolean).join(" ");
	},
} as const;

/**
 * Badge 组件的属性接口
 */
export type { IBadgePropsBase };
