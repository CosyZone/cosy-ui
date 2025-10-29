import type { IBadgePropsBase } from "./badgePropsBase";
import { getBaseBadgeClasses } from "./class-all";

/**
 * 渲染 Badge 的 HTML 字符串（框架无关）
 *
 * 该函数只负责组装 class 名称和生成 HTML 结构
 * 所有样式类名由 class-*.ts 文件负责提供
 *
 * @param props - Badge 组件的 props
 * @param slotContent - 已渲染的 slot 内容（HTML 字符串）
 * @returns 完整的 Badge HTML 字符串
 */
export function renderBadge(
	props: IBadgePropsBase,
	slotContent: string,
): string {
	// 使用现有的类名组装函数
	const badgeClasses = getBaseBadgeClasses(props);
	const badgeClass = badgeClasses.filter(Boolean).join(" ");

	return `<div class="${badgeClass}">${slotContent}</div>`;
}
