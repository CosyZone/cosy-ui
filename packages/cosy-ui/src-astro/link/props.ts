import type { HTMLAttributes } from "astro/types";
import type { ILinkPropsBase } from "../../src/components/link/linkPropsBase";

/**
 * Link 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface ILinkProps
    extends ILinkPropsBase,
    Omit<HTMLAttributes<"a">, keyof ILinkPropsBase> {
    // 继承基础属性和 HTML a 属性，但避免冲突
}
