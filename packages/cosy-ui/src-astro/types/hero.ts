/**
 * Hero 组件相关类型定义
 */

/**
 * 链接接口
 */
export interface Link {
    text: string;
    href: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    variant:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
}

/**
 * 图片配置接口
 */
export interface ImageConfig {
    src: string;
    alt: string;
}

/**
 * 背景类型
 */
export type BackgroundType =
    | 'gradient'
    | 'plain'
    | 'gradient-primary'
    | 'gradient-secondary'
    | 'gradient-accent'
    | 'gradient-success'
    | 'gradient-warning'
    | 'gradient-info'
    | 'gradient-sky'
    | 'gradient-sunset'
    | 'gradient-forest'
    | 'gradient-ocean'
    | 'gradient-mountain'
    | 'gradient-flower'
    | 'gradient-watermelon'
    | 'gradient-lemon'
    | 'gradient-grape'
    | 'gradient-blueberry'
    | 'gradient-mango'
    | 'gradient-kiwi'
    | 'gradient-pitaya'
    | 'gradient-banana';

/**
 * 对齐方式类型
 */
export type AlignType = 'center' | 'left' | 'right';

/**
 * 图片位置类型
 */
export type ImagePositionType = 'right' | 'left' | 'top' | 'bottom';

/**
 * 背景遮罩类型
 */
export type BackgroundOverlayType = 'none' | 'light' | 'dark' | 'primary' | 'gradient';

/**
 * Hero 组件属性接口
 */
export interface HeroProps {
    align?: AlignType;
    background?: BackgroundType;
    backgroundImage?: string;
    backgroundOverlay?: BackgroundOverlayType;
    description: string;
    image?: ImageConfig;
    imagePosition?: ImagePositionType;
    links: Link[];
    overlayOpacity?: number;
    title: string;
}
