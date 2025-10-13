import type { IReviewPropsBase } from "../../src/components/review/reviewPropsBase";
import type {
	IReviewsPropsBase,
	IReviewData,
} from "../../src/components/review/reviewsPropsBase";

/**
 * Review 组件的 Vue 版本属性接口（继承基础接口）
 */
export interface IReviewProps extends IReviewPropsBase {
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
 * Reviews 组件的 Vue 版本属性接口（继承基础接口）
 */
export interface IReviewsProps extends IReviewsPropsBase {
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
