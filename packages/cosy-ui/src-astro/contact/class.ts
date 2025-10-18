import type { ContactProps } from "./props";

/**
 * 计算 Contact 组件的组合类名
 * @param props Contact 组件的 props
 * @returns 组合后的类名字符串
 */
export function getContactCombinedClasses(props: ContactProps): string {
	const { class: className = "" } = props;

	// 构建自定义样式类（用于覆盖Card组件的默认样式）
	const customClasses = [
		"cosy:shadow-lg",
		"hover:cosy:shadow-xl",
		"hover:cosy:bg-base-200",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return customClasses;
}

/**
 * 获取联系信息项的样式类
 * @returns 联系信息项的样式类
 */
export function getContactItemClass(): string {
	return "cosy:flex cosy:items-center cosy:gap-3 cosy:mb-4 last:cosy:mb-0 cosy:transition-all cosy:duration-200 cosy:ease-in-out hover:cosy:bg-base-200/50 hover:cosy:rounded-lg hover:cosy:p-2 hover:cosy:-mx-2";
}

/**
 * 获取图标样式类
 * @returns 图标样式类
 */
export function getIconClass(): string {
	return "cosy:w-5 cosy:h-5 cosy:text-primary cosy:flex-shrink-0 cosy:transition-all cosy:duration-200 hover:cosy:scale-110 hover:cosy:text-primary/80";
}

/**
 * 获取社交媒体链接样式类
 * @returns 社交媒体链接样式类
 */
export function getSocialLinkClass(): string {
	return "cosy:btn cosy:btn-ghost cosy:btn-circle cosy:btn-sm cosy:text-base-content hover:cosy:text-primary hover:cosy:bg-primary/10";
}
