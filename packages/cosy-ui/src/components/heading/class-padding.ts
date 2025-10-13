/**
 * 计算 Heading 组件的内边距相关类名
 * @param padding 内边距大小
 * @returns 内边距相关的类名
 */
export function getHeadingPaddingClass(
    padding: "none" | "sm" | "md" | "lg" | "xl" = "none",
): string {
    const paddingMap = {
        none: "",
        sm: "cosy:py-2",
        md: "cosy:py-4",
        lg: "cosy:py-6",
        xl: "cosy:py-8",
    } as const;
    return paddingMap[padding] || paddingMap.none;
}
