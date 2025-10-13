import type { ICardPropsBase } from "../../src/components/card/cardPropsBase";

/**
 * Card 组件的 Vue 版本属性接口（继承基础接口并扩展 Vue 特定属性）
 */
export interface ICardProps extends ICardPropsBase {
    /**
     * 卡片顶部图片的URL（Vue版本只支持字符串类型）
     */
    imageUrl?: string;
}
