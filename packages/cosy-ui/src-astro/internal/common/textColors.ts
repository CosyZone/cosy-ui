/**
 * 文本颜色类名映射（供 Text/Heading 等使用）
 */
export const textColorClasses = {
	default: "",
	primary: "cosy:text-primary cosy:dark:text-primary",
	secondary: "cosy:text-secondary cosy:dark:text-secondary",
	accent: "cosy:text-accent cosy:dark:text-accent",
	muted: "cosy:text-gray cosy:dark:text-gray",
	info: "cosy:text-info cosy:dark:text-info",
	success: "cosy:text-success cosy:dark:text-success",
	warning: "cosy:text-warning cosy:dark:text-warning",
	error: "cosy:text-error cosy:dark:text-error",
	"base-content": "cosy:text-base-content cosy:dark:text-base-content",
	"neutral-content": "cosy:text-neutral-content cosy:dark:text-neutral-content",
	white: "cosy:text-white",
} as const;

export type TextColor = keyof typeof textColorClasses;
