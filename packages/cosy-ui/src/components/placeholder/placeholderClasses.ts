import { widthClasses } from "../../../src/common/width";
import { heightClasses } from "../../../src/common/height";
import { paddingClasses } from "../../../src/common/padding";

/**
 * Placeholder 组件的类名映射（与框架无关）
 */

// 宽度类名映射（直接使用 common 中的映射）
export const placeholderWidthClasses = widthClasses;

// 高度类名映射（直接使用 common 中的映射）
export const placeholderHeightClasses = heightClasses;

// 内边距类名映射（直接使用 common 中的映射）
export const placeholderPaddingClasses = paddingClasses;

// 边框类名映射
export const placeholderBorderClasses = {
	true: "cosy:border cosy:border-base-300",
	false: "",
} as const;
