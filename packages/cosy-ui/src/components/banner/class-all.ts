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
		.py(8)
		.px(4)
		.rounded("lg")
		.align("center")
		.text("2xl")
		.add("cosy:md:text-3xl") // 保留：响应式类名
		.weight("bold")
		.transitionAll()
		.duration(300)
		.easeInOut()
		.backdropBlur("sm")
		.bgOpacity(90)
		.shadow("md")
		.add(
			"cosy:hover:shadow-lg", // 保留：伪类状态
			"cosy:hover:scale-[1.01]", // 保留：伪类状态
			bgClass, // 保留：动态类名
			getTextColorClass(), // 保留：动态类名
			animationClass, // 保留：动态类名
			className, // 保留：用户自定义类名
		)
		.build();

	return bannerClass;
}
