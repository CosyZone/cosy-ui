/**
 * 动画效果类型
 */
export type AnimationType = "none" | "fade" | "slide" | "both";

/**
 * 动画效果类名映射
 */
export const animationClasses: Record<AnimationType, string> = {
	none: "",
	fade: "cosy:animate-fadeIn",
	slide: "cosy:animate-slideUp",
	both: "cosy:animate-fadeIn cosy:animate-slideUp",
} as const;
