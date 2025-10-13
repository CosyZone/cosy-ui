import type { HTMLAttributes } from "astro/types";
import type { ICardPropsBase } from "../../src/components/card/cardPropsBase";
import type { ImageSource } from "../image/types";

/**
 * Card 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface ICardProps
    extends ICardPropsBase,
    HTMLAttributes<"article"> {
    /**
     * 自定义类名
     */
    class?: string;

    /**
     * 卡片顶部图片的URL或ImageMetadata
     */
    imageUrl?: ImageSource;
}
