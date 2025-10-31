import { cn } from "../../class";
import { textAlignClasses } from "../../common/textAlign";
import { textColorClasses } from "../../common/textColors";
import { textSizeClasses } from "../../common/textSizes";
import { textWeightClasses } from "../../common/textWeights";
import type { ITextProps } from "./textProps";

/**
 * 计算 Text 组件的组合类名
 * @param props Text 组件的 props
 * @returns 组合后的类名字符串
 */
export function getTextCombinedClass(props: ITextProps): string {
	const {
		size = "md",
		weight = "normal",
		color = "default",
		align = "left",
		italic = false,
		underline = false,
		truncate = false,
		class: className = "",
	} = props;

	// 根据大小设置样式（使用 common 映射）
	const sizeClass = textSizeClasses[size ?? "md"];

	// 根据粗细设置样式（使用 common 映射）
	const weightClass = textWeightClasses[weight ?? "normal"];

	// 根据颜色设置样式（使用 common 映射）
	const colorClass = textColorClasses[color ?? "default"];

	// 根据对齐方式设置样式（使用 common 映射）
	const alignClass = textAlignClasses[align ?? "left"];

	// 使用 classBuilder 组合所有类名
	const textClassBuilder = cn()
		.add("text") // 保留：自定义组件类名
		.add(sizeClass, weightClass, colorClass, alignClass); // 保留：动态类名

	// 根据条件添加文本样式
	if (italic) {
		textClassBuilder.italic();
	}
	if (underline) {
		textClassBuilder.underline();
	}
	if (truncate) {
		textClassBuilder.truncate();
	}

	const textClass = textClassBuilder
		.add(className) // 保留：用户自定义类名
		.build();

	return textClass;
}

/**
 * 获取 Text 组件的默认标签名
 * @param as 可选的标签名
 * @returns 标签名字符串
 */
export function getTextTagName(as?: string): string {
	return as || "p";
}
