/**
 * 图片组件公共工具函数
 */

// 边框类名映射（从 common 导入）
export { type BorderSize, borderClasses } from "../../src/common/border";
// 遮罩类名映射（从 common 导入）
export { type MaskType, maskClasses } from "../../src/common/mask";
// 圆角类名映射（从 common 导入）
export { type RoundedSize, roundedClasses } from "../../src/common/rounded";

// 阴影类名映射（从 common 导入）
export { type ShadowSize, shadowClasses } from "../../src/common/shadow";

// 对象填充方式类名映射
export const objectFitClasses = {
	contain: "cosy:object-contain",
	cover: "cosy:object-cover",
	fill: "cosy:object-fill",
	none: "cosy:object-none",
	"scale-down": "cosy:object-scale-down",
} as const;

// 悬停效果类名映射
export const hoverClasses = {
	none: "",
	scale: "cosy:hover:scale-110 cosy:transition-transform cosy:duration-300",
	brightness: "cosy:hover:brightness-110 cosy:transition-all cosy:duration-300",
	blur: "cosy:hover:blur-sm",
} as const;

// 过渡动画类名映射
export const transitionClasses = {
	none: "",
	fade: "cosy:transition-opacity cosy:duration-300",
	slide: "cosy:transition-transform cosy:duration-300",
	zoom: "cosy:transition-all cosy:duration-300",
} as const;

// 类型定义
export type ObjectFitType = keyof typeof objectFitClasses;
export type HoverType = keyof typeof hoverClasses;
export type TransitionType = keyof typeof transitionClasses;
