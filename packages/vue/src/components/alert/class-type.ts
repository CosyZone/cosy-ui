/**
 * 获取 Alert 组件的类型类名
 * @param type Alert 类型
 * @returns 类型类名
 */
export function getAlertTypeClass(
	type: "info" | "success" | "warning" | "error" = "info",
): string {
	// 预定义所有可能的类型类名，避免动态拼接导致 Tailwind 无法解析
	const typeClasses = {
		info: "cosy:alert-info",
		success: "cosy:alert-success",
		warning: "cosy:alert-warning",
		error: "cosy:alert-error",
	};

	return typeClasses[type] || typeClasses.info;
}
