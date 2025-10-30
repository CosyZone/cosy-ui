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
	const cardClass = cn()
		.add("cosy:card")
		.w("full")
		.add(backgroundClass) // 不再提供默认背景色，避免与Container组件冲突
		.add("cosy:transition-all", "cosy:duration-300", "cosy:ease-in-out")
		.add(compact ? "cosy:card-compact" : "")
		.add(
			href
				? "cosy:cursor-pointer cosy:hover:scale-105 cosy:transform cosy:no-underline"
				: "",
		)
		.add(className)
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
