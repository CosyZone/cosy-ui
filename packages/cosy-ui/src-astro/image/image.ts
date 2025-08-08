import type { ImageMetadata } from 'astro';

/**
 * 图片元数据接口
 * 用于统一管理项目中的图片元数据类型
 * 继承自 Astro 的 ImageMetadata 类型
 */
export interface IImageMetadata extends ImageMetadata {
    // 可以在这里添加额外的属性
}

/**
 * 图片源类型
 * 可以是 IImageMetadata 对象、字符串 URL 或 Astro 的 ImageMetadata
 */
export type ImageSource = string | ImageMetadata;
