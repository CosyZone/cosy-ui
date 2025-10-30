import type { HTMLAttributes } from "astro/types";
import type { IAvatarPropsBase } from "../../src/components/avatar/avatarPropsBase";

/**
 * Avatar 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface AvatarProps
    extends IAvatarPropsBase,
    Omit<HTMLAttributes<"div">, keyof IAvatarPropsBase> {
    /**
     * 自定义类名
     */
    class?: string;

    /**
     * 类名列表
     */
    "class:list"?: any;
}
