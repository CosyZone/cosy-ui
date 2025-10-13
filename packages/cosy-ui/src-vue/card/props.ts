import type { ICardPropsBase } from "../../src/components/card/cardPropsBase";
import type { IContainerProps } from "../container/props";

/**
 * Card 组件的 Vue 版本属性接口（继承基础接口和Container属性）
 */
export interface ICardProps extends ICardPropsBase, Omit<IContainerProps, "class" | "backgroundImage"> {
    /**
     * 卡片顶部图片的URL（Vue版本只支持字符串类型）
     */
    imageUrl?: string;
}
