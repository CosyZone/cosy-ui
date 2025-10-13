import type { ICardProps } from "./props";
import {
	getBaseCardClasses,
	getCardPaddingClass,
} from "../../src/components/card/class-all";

/**
 * 计算 Card 组件的组合类名
 * @param props Card 组件的 props
 * @returns 组合后的类名数组
 */
export function getCardCombinedClasses(props: ICardProps): string[] {
	const baseClasses = getBaseCardClasses(props);

	return baseClasses;
}

/**
 * 计算 Card 组件内容区域的 padding 类名
 * @param compact 是否使用紧凑模式
 * @returns padding 类名
 */
export function getCardPaddingClassVue(compact?: boolean): string {
	return getCardPaddingClass(compact);
}
