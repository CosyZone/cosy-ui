/**
 * 图片项接口
 */
export interface ImageItem {
    /** 图片源地址 */
    src: string;
    /** 图片替代文本 */
    alt: string;
    /** 图片宽度 */
    width?: number;
    /** 图片高度 */
    height?: number;
    /** 图片加载方式 */
    loading?: 'lazy' | 'eager';
    /** 图片标题 */
    caption?: string;
}

/**
 * ImageRow 组件属性接口
 */
export interface ImageRowProps {
    /** 图片数组 */
    images: ImageItem[];
    /** 图片间距 */
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** 图片圆角 */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    /** 图片阴影 */
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    /** 悬停效果 */
    hover?: 'none' | 'scale' | 'brightness' | 'blur';
    /** 背景色类型，支持所有 Tailwind 背景色和透明度变体 */
    background?: string;
    /** 内边距大小 */
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    /** 外边距大小 */
    margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    /** 是否显示边框 */
    border?: boolean;
    /** 容器宽度 */
    width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /** 自定义 CSS 类名 */
    class?: string;
}
