/**
 * 获取 Button 组件的形状类名
 * @param shape Button 形状
 * @returns 形状类名
 */
export function getButtonShapeClass(shape?: "circle" | "square"): string {
	// 预定义所有可能的形状类名，避免动态拼接导致 Tailwind 无法解析
	const shapeClasses = {
		circle: "cosy:btn-circle",
		square: "cosy:btn-square",
	};

	return shape ? shapeClasses[shape] || "" : "";
}
