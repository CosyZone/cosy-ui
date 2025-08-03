/**
 * 内边距尺寸类型
 */
export type PaddingSize = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

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
    /** 图标关键词数组，用于图标匹配 */
    keywords?: string[];
    /** 图标尺寸，默认为 "md" */
    iconSize?: "sm" | "md" | "lg" | "xl";
    /** 内容区域内边距，默认为 "lg" */
    contentPadding?: PaddingSize;
} 
