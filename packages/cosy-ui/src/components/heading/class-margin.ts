/**
 * 计算 Heading 组件的外边距相关类名
 * @param margin 外边距大小
 * @returns 外边距相关的类名
 */
export function getHeadingMarginClass(
    margin: "none" | "sm" | "md" | "lg" | "xl" = "md",
): string {
    const marginMap = {
        none: "",
        sm: "cosy:my-2",
        md: "cosy:my-4",
        lg: "cosy:my-6",
        xl: "cosy:my-8",
    };
    return marginMap[margin] || marginMap.md;
}
