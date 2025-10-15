/**
 * 获取 Button 组件的修饰符类名
 * @param wide 是否为宽按钮
 * @param block 是否为块级显示
 * @param loading 是否显示加载状态
 * @returns 修饰符类名数组
 */
export function getButtonModifierClasses(
	wide?: boolean,
	block?: boolean,
	loading?: boolean,
): string[] {
	const classes: string[] = [];

	if (wide) classes.push("cosy:btn-wide");
	if (block) classes.push("cosy:btn-block");
	if (loading) classes.push("cosy:loading");

	return classes;
}
