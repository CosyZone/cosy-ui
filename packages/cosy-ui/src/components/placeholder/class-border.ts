/**
 * 计算 Placeholder 组件的边框相关类名
 * @param border 是否显示边框
 * @returns 边框相关的类名
 */
export function getPlaceholderBorderClass(border: boolean = false): string {
    return border ? "cosy:border cosy:border-base-300" : "";
}