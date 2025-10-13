/**
 * 获取 Button 组件的尺寸类名
 * @param size Button 尺寸
 * @returns 尺寸类名
 */
export function getButtonSizeClass(size?: "lg" | "md" | "sm" | "xs"): string {
	// 预定义所有可能的尺寸类名，避免动态拼接导致 Tailwind 无法解析
	const sizeClasses = {
		lg: "cosy:btn-lg",
		md: "cosy:btn-md",
		sm: "cosy:btn-sm",
		xs: "cosy:btn-xs",
	};

	return size ? sizeClasses[size] || "" : "";
}
