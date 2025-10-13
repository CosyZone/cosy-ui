/**
 * 获取 Badge 组件的变体类名
 * @param variant Badge 变体
 * @returns 变体类名
 */
export function getBadgeVariantClass(
    variant?: "primary" | "secondary" | "accent" | "ghost" | "info" | "success" | "warning" | "error"
): string {
    // 预定义所有可能的变体类名，避免动态拼接导致 Tailwind 无法解析
    const variantClasses = {
        primary: "cosy:badge-primary",
        secondary: "cosy:badge-secondary",
        accent: "cosy:badge-accent",
        ghost: "cosy:badge-ghost",
        info: "cosy:badge-info",
        success: "cosy:badge-success",
        warning: "cosy:badge-warning",
        error: "cosy:badge-error",
    };

    return variant ? variantClasses[variant] || "" : "";
}
