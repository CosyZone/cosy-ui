import type { HTMLAttributes } from "astro/types";
import type { IReviewPropsBase } from "../../src/components/review/reviewPropsBase";
import type { IReviewsPropsBase, IReviewData } from "../../src/components/review/reviewsPropsBase";

/**
 * Review 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface IReviewProps
    extends IReviewPropsBase,
    Omit<HTMLAttributes<"div">, keyof IReviewPropsBase> {
    /**
     * 自定义类名
     */
    class?: string;

    /**
     * 类名列表
     */
    "class:list"?: any;
}

/**
 * Reviews 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface IReviewsProps
    extends IReviewsPropsBase,
    Omit<HTMLAttributes<"div">, keyof IReviewsPropsBase> {
    /**
     * 自定义类名
     */
    class?: string;

    /**
     * 类名列表
     */
    "class:list"?: any;
}

export type { IReviewData };
