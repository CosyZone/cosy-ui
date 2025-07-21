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
    /** 图标尺寸，默认为 "md" */
    iconSize?: "sm" | "md" | "lg" | "xl";
} 
