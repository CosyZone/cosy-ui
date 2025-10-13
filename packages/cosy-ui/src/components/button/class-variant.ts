/**
 * 获取 Button 组件的变体类名
 * @param variant Button 变体
 * @returns 变体类名
 */
export function getButtonVariantClass(
	variant?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error"
		| "ghost"
		| "link"
		| "outline"
		| "neutral"
		| "gradient-sky"
		| "gradient-watermelon"
		| "gradient-lemon"
		| "gradient-grape"
		| "gradient-mango"
		| "gradient-forest"
		| "gradient-ocean"
		| "gradient-sunset"
		| "gradient-flower"
		| "gradient-pitaya"
		| "gradient-banana"
		| "gradient-blueberry"
		| "gradient-kiwi",
): string {
	// 预定义所有可能的变体类名，避免动态拼接导致 Tailwind 无法解析
	const variantClasses = {
		primary: "cosy:btn-primary",
		secondary: "cosy:btn-secondary",
		accent: "cosy:btn-accent",
		info: "cosy:btn-info",
		success: "cosy:btn-success",
		warning: "cosy:btn-warning",
		error: "cosy:btn-error",
		ghost: "cosy:btn-ghost",
		link: "cosy:btn-link",
		outline: "cosy:btn-outline",
		neutral: "cosy:btn-neutral",
		// 渐变变体类名由专门的函数处理
		"gradient-sky": "",
		"gradient-watermelon": "",
		"gradient-lemon": "",
		"gradient-grape": "",
		"gradient-mango": "",
		"gradient-forest": "",
		"gradient-ocean": "",
		"gradient-sunset": "",
		"gradient-flower": "",
		"gradient-pitaya": "",
		"gradient-banana": "",
		"gradient-blueberry": "",
		"gradient-kiwi": "",
	};

	return variant ? variantClasses[variant] || "" : "";
}
