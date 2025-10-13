/**
 * Review 组件的基础属性接口（与框架无关）
 */
export interface IReviewPropsBase {
	/**
	 * 用户名称
	 */
	userName: string;

	/**
	 * 评分（1-5）
	 */
	rating: number;

	/**
	 * 评论内容
	 */
	comment: string;

	/**
	 * 评价日期
	 */
	date?: string;

	/**
	 * 是否认证用户
	 * @default false
	 */
	verified?: boolean;

	/**
	 * 用户头像URL
	 */
	avatar?: string;
}
