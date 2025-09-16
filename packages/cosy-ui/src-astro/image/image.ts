import type { ImageMetadata } from 'astro';

/**
 * 图片源类型
 * 可以是 ImageMetadata 对象、字符串 URL 或 Astro 的 ImageMetadata
 */
export type ImageSource = string | ImageMetadata;
