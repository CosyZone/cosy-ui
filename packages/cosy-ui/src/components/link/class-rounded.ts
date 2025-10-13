import { roundedClasses } from "../../../src/common/rounded";
import type { RoundedSize } from "../../../src/common/rounded";

/**
 * 获取 Link 组件的圆角类名
 * @param btn 是否为按钮风格
 * @param rounded 圆角大小
 * @returns 圆角类名
 */
export function getLinkRoundedClass(
    btn: boolean,
    rounded: "none" | "sm" | "md" | "lg" | "xl" | "full",
): string {
    // 按钮风格下不处理圆角，由按钮类处理
    if (btn) {
        return "";
    }

    // 非按钮风格下使用圆角类
    return roundedClasses[rounded as RoundedSize] || "";
}
