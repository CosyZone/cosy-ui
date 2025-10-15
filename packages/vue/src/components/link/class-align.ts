/**
 * 获取 Link 组件的对齐类名
 * @param align 对齐方式
 * @returns 对齐类名
 */
export function getLinkAlignClass(
	align: "left" | "center" | "right" | undefined,
): string {
	// 对齐
	if (align === "center") {
		return "cosy:justify-center cosy:text-center";
	} else if (align === "right") {
		return "cosy:justify-end cosy:text-right";
	} else if (align === "left") {
		return "cosy:justify-start cosy:text-left";
	}

	return "";
}
