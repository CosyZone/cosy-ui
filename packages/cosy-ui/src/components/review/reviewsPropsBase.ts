/**
 * Reviews 组件的基础属性接口（与框架无关）
 */
export interface IReviewData {
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
     */
    verified?: boolean;

    /**
     * 用户头像URL
     */
    avatar?: string;
}

export interface IReviewsPropsBase {
    /**
     * 评价数据数组
     */
    reviews: IReviewData[];

    /**
     * 标题
     */
    title?: string;

    /**
     * 是否显示统计信息
     * @default false
     */
    showStats?: boolean;

    /**
     * 布局模式
     * @default 'grid'
     */
    layout?: "grid" | "list";

    /**
     * 网格列数配置
     * @default { base: 1, md: 2, lg: 3 }
     */
    columns?: {
        base?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        "2xl"?: number;
    };

    /**
     * 最大显示评价数
     */
    maxReviews?: number;
}
