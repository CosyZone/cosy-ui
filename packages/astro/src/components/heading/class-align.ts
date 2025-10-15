import {
	textAlignClasses,
	type TextAlign,
} from "../../../src/common/textAlign";

/**
 * 计算 Heading 组件的文本对齐相关类名
 * @param align 文本对齐方式
 * @returns 对齐相关的类名
 */
export function getHeadingAlignClass(
	align: Exclude<TextAlign, "justify"> = "left",
): string {
	return textAlignClasses[align] || textAlignClasses.left;
}
