/**
 * 通用边框配置
 * 包含各种边框尺寸的类型定义和对应的 CSS 类名映射
 * 适用于所有需要边框功能的组件
 */

// 边框尺寸类型
export type BorderSize = "none" | "sm" | "md" | "lg" | "xl";

// 边框类名映射
export const borderClasses: Record<BorderSize, string> = {
    none: "",
    sm: "cosy:border cosy:border-base-300",
    md: "cosy:border-2 cosy:border-base-300",
    lg: "cosy:border-4 cosy:border-base-300",
    xl: "cosy:border-8 cosy:border-base-300",
} as const;

/**
 * 获取边框类名
 * @param border 边框尺寸类型
 * @returns 边框CSS类名
 */
export function getBorderClass(border?: BorderSize): string {
    if (!border) return "";
    return borderClasses[border] || "";
}
