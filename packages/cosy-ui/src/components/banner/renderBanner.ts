import type { IBannerPropsBase } from "./bannerPropsBase";
import { getBaseBannerClasses } from "./class-all";

/**
 * 渲染 Banner 的 HTML 字符串（框架无关）
 *
 * 该函数只负责组装 class 名称和生成 HTML 结构
 * 样式定义位于 src/styles/banner-animations.css
 *
 * @param props - Banner 组件的 props
 * @param slotContent - 已渲染的 slot 内容（HTML 字符串）
 * @returns 完整的 Banner HTML 字符串
 */
export function renderBanner(
	props: IBannerPropsBase,
	slotContent: string,
): string {
	const { style = "" } = props;

	// 获取类名
	const bannerClass = getBaseBannerClasses(props);

	// 生成 HTML 字符串
	const styleAttr = style ? ` style="${style}"` : "";

	return `<div class="${bannerClass}"${styleAttr}>${slotContent}</div>`;
}
