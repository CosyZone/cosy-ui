import { getBackgroundClass } from "../../../src/common/backgrounds";
import { cn } from "../../class";
import type { ICardPropsBase } from "./cardPropsBase";

/**
 * 计算 Card 组件的组合类名（用于基础接口）
 * @param props Card 组件的基础 props
 * @returns 组合后的类名字符串
 */
export function getBaseCardClasses(props: ICardPropsBase): string {
	const { background, class: className = "", compact, href } = props;

	// 获取背景色类名
	const backgroundClass = getBackgroundClass(background);

	// 使用 classBuilder 构建卡片样式类
	const cardClassBuilder = cn()
		.add("cosy:card") // 保留：DaisyUI 组件类名
		.w("full")
		.add(backgroundClass) // 保留：动态类名
		.transitionAll()
		.duration(300)
		.easeInOut()
		.add(compact ? "cosy:card-compact" : ""); // 保留：DaisyUI 组件类名

	// 如果有链接，添加链接相关样式
	if (href) {
		cardClassBuilder
			.cursorPointer()
			.transform()
			.noUnderline()
			.add("cosy:hover:scale-105"); // 保留：伪类状态
	}

	const cardClass = cardClassBuilder
		.add(className) // 保留：用户自定义类名
		.build();

	return cardClass;
}

/**
 * 计算 Card 组件内容区域的 padding 类名
 * @param compact 是否使用紧凑模式
 * @returns padding 类名
 */
export function getCardPaddingClass(compact?: boolean): string {
	return compact ? "cosy:p-4" : "cosy:p-6";
}
