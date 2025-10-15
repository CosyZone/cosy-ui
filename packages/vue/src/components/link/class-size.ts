/**
 * 获取 Link 组件的尺寸类名
 * @param size 链接尺寸
 * @param btn 是否为按钮风格
 * @returns 尺寸类名数组
 */
export function getLinkSizeClasses(
	size: "sm" | "md" | "lg",
	btn: boolean,
): string[] {
	const classes: string[] = [];

	// 按钮风格下的尺寸
	if (btn) {
		if (size === "sm") {
			classes.push("cosy:btn-sm");
		} else if (size === "lg") {
			classes.push("cosy:btn-lg");
		}
	} else {
		// 非按钮风格下的尺寸
		if (size === "sm") {
			classes.push("cosy:text-sm");
		} else if (size === "md") {
			classes.push("cosy:text-base");
		} else if (size === "lg") {
			classes.push("cosy:text-lg");
		}
	}

	return classes;
}
