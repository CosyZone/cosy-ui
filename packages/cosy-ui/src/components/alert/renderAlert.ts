import { cn } from "../../class";
import type { IAlertPropsBase } from "./alertPropsBase";
import { getBaseAlertClasses } from "./class-all";

/**
 * Alert 渲染选项
 */
export interface IAlertRenderOptions {
	/** 已渲染的图标 HTML */
	iconHtml?: string;
	/** 已渲染的默认 slot HTML */
	defaultSlotHtml: string;
	/** 已渲染的 action slot HTML */
	actionSlotHtml?: string;
}

/**
 * 渲染 Alert 的 HTML 字符串（框架无关）
 *
 * 该函数负责组装 Alert 的完整 HTML 结构
 *
 * @param props - Alert 组件的 props
 * @param options - 渲染选项（包含已渲染的图标和 slot 内容）
 * @returns 完整的 Alert HTML 字符串
 */
export function renderAlert(
	props: IAlertPropsBase,
	options: IAlertRenderOptions,
): string {
	const { title, description, showIcon = true, closable = true } = props;

	const { iconHtml = "", defaultSlotHtml, actionSlotHtml = "" } = options;

	// 获取主容器类名
	const alertClass = getBaseAlertClasses(props).filter(Boolean).join(" ");

	// 构建各个部分的类名
	const containerClass = cn()
		.flex("row")
		.items("center")
		.gap(4)
		.justify("between")
		.w("full")
		.build();

	const contentClass = cn()
		.flex("col")
		.items("start")
		.h("full")
		.flex1()
		.build();

	const actionsClass = cn().flex("row").items("center").gap(2).build();

	const titleClass = cn().bold().build();

	const descriptionClass = cn().text("xs").opacity(80).build();

	const closeBtnClass = cn()
		.auto()
		.add("cosy:btn", "cosy:btn-ghost", "cosy:btn-circle", "cosy:btn-sm")
		.build();

	const iconClass = cn().h(5).w(5).build();

	const contentWrapperClass = cn().text("xs").build();

	// 构建 HTML
	const iconSection = showIcon && iconHtml ? iconHtml : "";

	const titleSection = title
		? `<h3 class="${titleClass}" style="margin-top: 0 !important">${title}</h3>`
		: "";

	const descriptionSection = description
		? `<div class="${descriptionClass}">${description}</div>`
		: "";

	const contentSection = title
		? `<div class="${contentWrapperClass}">${defaultSlotHtml}</div>`
		: defaultSlotHtml;

	const closeIcon = `<svg class="${iconClass}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`;

	const closeButton = closable
		? `<button class="${closeBtnClass}" onclick="this.parentElement.parentElement.style.display = 'none';">${closeIcon}</button>`
		: "";

	return `
<div class="${alertClass}" role="alert">
  <div class="${containerClass}">
    ${iconSection}
    <div class="${contentClass}">
      ${titleSection}
      ${descriptionSection}
      ${contentSection}
    </div>
    <div class="${actionsClass}" data-role="actions">
      ${actionSlotHtml}
      ${closeButton}
    </div>
  </div>
</div>`.trim();
}
