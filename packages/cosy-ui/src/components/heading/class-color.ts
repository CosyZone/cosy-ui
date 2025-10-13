import { textColorClasses, type TextColor } from "../../../src/common/textColors";

/**
 * 计算 Heading 组件的颜色相关类名
 * @param color 文本颜色
 * @returns 颜色相关的类名
 */
export function getHeadingColorClass(
    color: TextColor = "default",
): string {
    return textColorClasses[color] || textColorClasses.default;
}
