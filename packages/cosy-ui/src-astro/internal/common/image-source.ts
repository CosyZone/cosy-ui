import type { ImageMetadata } from "astro";

/** 图片来源：本地资源路径、远程 URL 或 Astro 的 ImageMetadata */
export type ImageSource = string | ImageMetadata;
