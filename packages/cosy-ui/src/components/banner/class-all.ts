import { cn } from "../../class";
import { getBackgroundClass } from "../../common";
import type { IBannerPropsBase } from "./bannerPropsBase";
import { animationClasses } from "./class-animation";

/**
 * 获取 Banner 的类名字符串
 * @param props - Banner 组件的 props
 * @returns 组合后的类名字符串
 */
export function getBaseBannerClasses(props: IBannerPropsBase): string {
	const {
		class: className = "",
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

	return bannerClass;
}
