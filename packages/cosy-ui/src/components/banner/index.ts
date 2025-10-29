import type { IBannerPropsBase } from "./bannerPropsBase";
import { renderBanner } from "./renderBanner";
import { getBaseBannerClasses } from "./class-all";

/**
 * Banner 门面对象 - 统一的 Banner 组件接口
 *
 * 该门面提供所有 Banner 相关的功能，适用于不同的使用场景：
 * - SSR 框架（如 Astro）: 使用 BannerFacade.render()
 * - CSR 框架（如 Vue/React）: 使用 BannerFacade.getClassString()
 *
 * @example
 * ```typescript
 * // Astro 中使用
 * const html = BannerFacade.render({ bgColor: 'primary' }, 'Content');
 *
 * // Vue/React 中使用
 * const className = BannerFacade.getClassString({ bgColor: 'primary' });
 * ```
 */
export const BannerFacade = {
	/**
	 * 渲染完整的 Banner HTML 字符串（框架无关）
	 * 适用于 SSR 框架如 Astro
	 *
	 * @param props - Banner 组件的属性
	 * @param slotContent - 已渲染的 slot 内容（HTML 字符串）
	 * @returns 完整的 Banner HTML 字符串
	 */
	render: renderBanner,

	/**
	 * 获取 Banner 的类名字符串（便捷方法）
	 * 适用于 CSR 框架如 Vue/React
	 *
	 * @param props - Banner 组件的属性
	 * @returns 组合后的类名字符串
	 */
	getClassString: getBaseBannerClasses,
} as const;

/**
 * Banner 组件的属性接口
 */
export type { IBannerPropsBase };
