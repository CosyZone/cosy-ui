import type { PaddingSize } from '../../src/common/padding';
import type { MarginSize } from '../../src/common/margin';
import type { RoundedSize } from '../../src/common/rounded';
import type { GapSize } from '../../src/common/layout';
import type { ShadowSize } from '../../src/common/shadow';
import type { HoverEffect } from '../../src/common/hover';
import type { Size } from '../../src/common/size';

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
    gap?: GapSize;
    /** 图片圆角 */
    rounded?: RoundedSize;
    /** 图片阴影 */
    shadow?: ShadowSize;
    /** 悬停效果 */
    hover?: HoverEffect;
    /** 背景色类型，支持所有 Tailwind 背景色和透明度变体 */
    background?: string;
    /** 内边距大小 */
    padding?: PaddingSize;
    /** 外边距大小 */
    margin?: MarginSize;
    /** 是否显示边框 */
    border?: boolean;
    /** 容器宽度 */
    width?: Size;
    /** 容器圆角 */
    containerRounded?: RoundedSize;
    /** 是否显示左右导航箭头 */
    showArrows?: boolean;
    /** 箭头按钮样式变体 */
    arrowVariant?: 'ghost' | 'outline' | 'primary' | 'secondary';
    /** 自定义 CSS 类名 */
    class?: string;
}
