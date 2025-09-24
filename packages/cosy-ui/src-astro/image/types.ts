import type {
    RoundedSize,
    MaskType,
    ShadowSize,
    BorderSize,
} from '../../src/common';
import type { ImageMetadata } from 'astro';
export type ImageSource = string | ImageMetadata;

export interface IImageProps {
    alt: string;
    border?: BorderSize;
    class?: string;
    height?: number;
    hover?: 'none' | 'scale' | 'brightness' | 'blur';
    lazy?: boolean;
    loading?: 'lazy' | 'eager';
    loadingIndicator?: 'pulse' | 'spinner' | 'progress' | 'skeleton';
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    objectPosition?: string;
    rounded?: RoundedSize;
    mask?: MaskType;
    shadow?: ShadowSize;
    showError?: boolean;
    showPlaceholder?: boolean;
    src: ImageSource;
    tooltip?: string;
    tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
    tooltipColor?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
    tooltipOpen?: boolean;
    transition?: 'none' | 'fade' | 'slide' | 'zoom';
    width?: number;
    asBackground?: boolean;
    preview?: boolean;
    layout?: string;
}

export interface IImagePropsBuilder {
    /**
     * 图片的替代文本
     */
    alt(value: string): IImagePropsBuilder;

    /**
     * 图片源（本地 ImageMetadata 或远程 URL）
     */
    src(value: ImageSource): IImagePropsBuilder;

    /**
     * 图片的边框样式
     * @default none
     */
    border(value: NonNullable<IImageProps['border']>): IImagePropsBuilder;

    /**
     * 自定义类名
     * @default ""
     */
    class(value: string): IImagePropsBuilder;

    /**
     * 图片高度（px）
     */
    height(value: number): IImagePropsBuilder;

    /**
     * 悬停效果
     * @default none
     */
    hover(value: NonNullable<IImageProps['hover']>): IImagePropsBuilder;

    /**
     * 是否启用懒加载（仅远程图）
     * @default true
     */
    lazy(value: boolean): IImagePropsBuilder;

    /**
     * 加载方式
     * @default lazy
     */
    loading(value: NonNullable<IImageProps['loading']>): IImagePropsBuilder;

    /**
     * 加载指示器
     * @default skeleton
     */
    loadingIndicator(value: NonNullable<IImageProps['loadingIndicator']>): IImagePropsBuilder;

    /**
     * 填充方式
     * @default cover
     */
    objectFit(value: NonNullable<IImageProps['objectFit']>): IImagePropsBuilder;

    /**
     * 对齐位置
     * @default center
     */
    objectPosition(value: string): IImagePropsBuilder;

    /**
     * 圆角
     * @default none
     */
    rounded(value: NonNullable<IImageProps['rounded']>): IImagePropsBuilder;

    /**
     * 遮罩
     * @default none
     */
    mask(value: NonNullable<IImageProps['mask']>): IImagePropsBuilder;

    /**
     * 阴影
     * @default none
     */
    shadow(value: NonNullable<IImageProps['shadow']>): IImagePropsBuilder;

    /**
     * 是否显示加载失败占位
     * @default true
     */
    showError(value: boolean): IImagePropsBuilder;

    /**
     * 是否显示加载中占位
     * @default true
     */
    showPlaceholder(value: boolean): IImagePropsBuilder;

    /**
     * 提示文本
     */
    tooltip(value: string): IImagePropsBuilder;

    /**
     * 提示位置
     * @default top
     */
    tooltipPlacement(value: NonNullable<IImageProps['tooltipPlacement']>): IImagePropsBuilder;

    /**
     * 提示颜色
     * @default neutral
     */
    tooltipColor(value: NonNullable<IImageProps['tooltipColor']>): IImagePropsBuilder;

    /**
     * 强制显示提示
     * @default false
     */
    tooltipOpen(value: boolean): IImagePropsBuilder;

    /**
     * 过渡动画
     * @default none
     */
    transition(value: NonNullable<IImageProps['transition']>): IImagePropsBuilder;

    /**
     * 图片宽度（px）
     */
    width(value: number): IImagePropsBuilder;

    /**
     * 作为背景层渲染
     * @default false
     */
    asBackground(value: boolean): IImagePropsBuilder;

    /**
     * 点击预览
     * @default false
     */
    preview(value: boolean): IImagePropsBuilder;

    /**
     * Astro Image 布局模式
     * @default constrained
     */
    layout(value: string): IImagePropsBuilder;

    /** 构建并返回完整 Props */
    build(): IImageProps;
}


