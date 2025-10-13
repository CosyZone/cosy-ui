/**
 * 获取 Link 组件的变体类名
 * @param variant 链接变体
 * @param btn 是否为按钮风格
 * @param ghost 是否为幽灵按钮
 * @param color 按钮颜色
 * @param fullWidth 是否为全宽按钮
 * @param circle 是否为圆形按钮
 * @param navigationType 导航类型
 * @returns 变体类名数组
 */
export function getLinkVariantClasses(
	variant:
		| "default"
		| "primary"
		| "secondary"
		| "text"
		| "cta"
		| "ghost"
		| "light"
		| "navigation"
		| "github",
	btn: boolean,
	ghost: boolean,
	color:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error"
		| undefined,
	fullWidth: boolean,
	circle: boolean,
	navigationType: "previous" | "next" | undefined,
): string[] {
	const classes: string[] = [];

	// 变体样式
	switch (variant) {
		case "primary":
			classes.push("cosy:text-primary cosy:hover:text-primary-focus");
			break;
		case "secondary":
			classes.push("cosy:text-secondary cosy:hover:text-secondary-focus");
			break;
		case "text":
			break;
		case "cta":
			classes.push(
				"cosy:text-accent cosy:hover:text-accent-focus cosy:font-medium",
			);
			break;
		case "ghost":
			classes.push("cosy:text-base-content cosy:hover:text-base-content/80");
			break;
		case "default":
			classes.push("cosy:text-base-content cosy:hover:text-base-content/90");
			break;
		case "light":
			classes.push("cosy:text-white cosy:hover:text-white/90 cosy:font-medium");
			break;
		case "navigation":
			classes.push(
				"cosy:flex cosy:items-center cosy:gap-3 cosy:p-4 cosy:bg-base-100 cosy:border cosy:border-base-300 cosy:rounded-lg cosy:shadow-sm cosy:hover:shadow-md cosy:hover:border-base-400 cosy:transition-all cosy:duration-300 cosy:ease-in-out cosy:no-underline cosy:hover:no-underline cosy:font-medium cosy:text-base-content cosy:hover:text-base-content cosy:hover:-translate-y-1 cosy:hover:scale-[1.01] cosy:backdrop-blur-sm cosy:hover:backdrop-blur-md",
			);
			break;
		case "github":
			classes.push(
				"cosy:flex cosy:items-center cosy:gap-2 cosy:text-base-content cosy:hover:text-base-content/80 cosy:transition-colors cosy:duration-200 cosy:no-underline cosy:hover:no-underline cosy:font-medium",
			);
			break;
	}

	// 按钮风格
	if (btn) {
		classes.push("cosy:btn");
	}

	// 幽灵按钮
	if (btn && ghost) {
		classes.push("cosy:btn-ghost");
	}

	// 按钮颜色
	if (btn && color) {
		classes.push(`cosy:btn-${color}`);
	}

	// 全宽按钮
	if (btn && fullWidth) {
		classes.push("cosy:btn-block");
	}

	// 圆形按钮
	if (btn && circle) {
		classes.push("cosy:btn-circle");
	}

	return classes;
}
