import type { IContainerPropsBase } from "./containerPropsBase";
import {
	widthClasses,
	flexClasses,
	gapClasses,
	itemsClasses,
	justifyClasses,
	roundedClasses,
} from "../../../src/common";
import { paddingClasses } from "../../../src/common/padding";
import { getBackgroundClass } from "../../../src/common/backgrounds";

/**
 * 计算 Container 组件的组合类名（用于基础接口）
 * @param props Container 组件的基础 props
 * @returns 组合后的类名数组
 */
export function getBaseContainerClasses(props: IContainerPropsBase): string[] {
	const {
		width = "md",
		padding = "md",
		flex,
		gap = "none",
		items,
		justify,
		rounded = "none",
		background,
		class: className = "",
		centered = true,
	} = props;

	// 构建CSS类名
	return [
		"cosy:w-full",
		centered ? "cosy:mx-auto" : "",
		widthClasses[width],
		paddingClasses[padding],
		roundedClasses[rounded],
		getBackgroundClass(background),
		flex ? flexClasses[flex] : "",
		flex ? gapClasses[gap] : "",
		items && flex ? itemsClasses[items] : "",
		justify && flex ? justifyClasses[justify] : "",
		className,
	];
}
