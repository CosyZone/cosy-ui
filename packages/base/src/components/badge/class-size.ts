/**
 * 获取 Badge 组件的尺寸类名
 * @param size Badge 尺寸
 * @returns 尺寸类名
 */
export function getBadgeSizeClass(size?: "xs" | "sm" | "md" | "lg"): string {
	// 预定义所有可能的尺寸类名，避免动态拼接导致 Tailwind 无法解析
	const sizeClasses = {
		xs: "cosy:badge-xs",
		sm: "cosy:badge-sm",
		md: "cosy:badge-md",
		lg: "cosy:badge-lg",
	};

	return size ? sizeClasses[size] || "" : "";
}
