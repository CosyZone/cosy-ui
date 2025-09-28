/// <reference types="astro/client" />

declare module "*.astro?raw" {
	const content: string;
	export default content;
}

declare module "*.astro" {
	const Component: any;
	export default Component;
}

// 声明 SVG 文件为 ImageMetadata 类型
declare module "*.svg" {
	import type { ImageMetadata } from "astro";
	const src: ImageMetadata;
	export default src;
}
