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
 * Images 组件属性接口
 */
export interface ImagesProps {
    /** 图片数组 */
    images: ImageItem[];
    /** 布局方式 */
    layout?: 'grid' | 'masonry' | 'carousel' | 'stack';
    /** 网格布局的列数 */
    columns?: number;
    /** 图片间距 */
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** 图片圆角 */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    /** 图片阴影 */
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    /** 悬停效果 */
    hover?: 'none' | 'scale' | 'brightness' | 'blur';
    /** 自定义 CSS 类名 */
    class?: string;
}
