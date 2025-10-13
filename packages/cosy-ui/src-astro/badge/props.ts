import type { HTMLAttributes } from "astro/types";
import type { IBadgePropsBase } from "../../src/components/badge/badgePropsBase";

/**
 * Badge 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface IBadgeProps
    extends IBadgePropsBase,
    Omit<HTMLAttributes<"div">, keyof IBadgePropsBase> {
    // 继承基础属性和 HTML div 属性，但避免冲突
}
