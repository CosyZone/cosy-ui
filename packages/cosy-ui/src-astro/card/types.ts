/**
 * Card 组件的 Props 接口
 */
export interface CardProps {
    /** 卡片标题 */
    title: string;
    /** 卡片副标题或描述 */
    subtitle?: string;
    /** 卡片顶部图片的URL */
    imageUrl?: string;
    /** 如果提供，卡片将变成可点击的链接 */
    href?: string;
    /** 是否使用紧凑模式 */
    compact?: boolean;
    /** 自定义CSS类，可用于覆盖默认样式 */
    class?: string;
}

/**
 * CardCourse 组件的 Props 接口
 */
export interface CardCourseProps {
    /** 课程标题 */
    courseName: string;
    /** 课程描述 */
    description?: string;
    /** 语言（"en" 或 "zh"） */
    lang: string;
    /** 课程链接 */
    href: string;
} 
