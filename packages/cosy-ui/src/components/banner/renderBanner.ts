import type { IBannerPropsBase } from "./bannerPropsBase";
import { animationClasses } from "./class-animation";
import { getBackgroundClass } from "../../common";
import { cn } from "../../class";

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
	const {
		class: className = "",
		style = "",
		bgColor = "primary",
		textColor = "",
		animation = "both",
	} = props;

	// 根据背景色自动设置文本颜色
	const getTextColorClass = () => {
		if (textColor) return `cosy:text-${textColor}`;

		const darkBgColors = ["primary", "secondary", "accent", "error"];
		return darkBgColors.includes(bgColor || "primary")
			? "cosy:text-white"
			: "cosy:text-gray-800";
	};

	const bgClass = getBackgroundClass(bgColor);
	const animationClass = animationClasses[animation || "both"];

	// 构建完整的类名
	const bannerClass = cn()
		.w("full")
		.add("cosy:py-8", "cosy:px-4", "cosy:rounded-lg", "cosy:text-center")
		.text("2xl")
		.add("cosy:md:text-3xl")
		.weight("bold")
		.add(
			"cosy:transition-all",
			"cosy:duration-300",
			"cosy:ease-in-out",
			"cosy:backdrop-blur-sm",
			"cosy:bg-opacity-90",
			"cosy:shadow-md",
			"cosy:hover:shadow-lg",
			"cosy:hover:scale-[1.01]",
			bgClass,
			getTextColorClass(),
			animationClass,
			className,
		)
		.build();

	// 生成 HTML 字符串
	const styleAttr = style ? ` style="${style}"` : "";

	return `<div class="${bannerClass}"${styleAttr}>${slotContent}</div>`;
}
