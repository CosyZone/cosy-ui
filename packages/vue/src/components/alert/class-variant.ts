/**
 * 获取 Alert 组件的变体类名
 * @param variant Alert 变体
 * @returns 变体类名
 */
export function getAlertVariantClass(
	variant: "solid" | "outline" | "dash" | "soft" = "solid",
): string {
	// 预定义所有可能的变体类名，避免动态拼接导致 Tailwind 无法解析
	const variantClasses = {
		solid: "",
		outline: "cosy:alert-outline",
		dash: "cosy:alert-dash",
		soft: "cosy:alert-soft",
	};

	return variantClasses[variant] || variantClasses.solid;
}
