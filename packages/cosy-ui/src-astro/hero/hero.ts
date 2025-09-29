/**
 * Hero 组件相关类型定义
 */
import type { ImageSource } from "src-astro/image";
import type { BackgroundColor } from "../../src/common/backgrounds";

/**
 * 链接接口
 */
export interface IHeroLink {
	text: string;
	href: string;
	target?: "_self" | "_blank" | "_parent" | "_top";
	variant:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error";
}

/**
 * 图片配置接口
 */
export interface ImageConfig {
	src: ImageSource;
	alt: string;
}

/**
 * 背景类型（使用通用的 BackgroundColor 类型）
 */
export type BackgroundType = BackgroundColor;

/**
 * 对齐方式类型
 */
export type AlignType = "center" | "left" | "right";

/**
 * 图片位置类型
 */
export type ImagePositionType = "right" | "left" | "top" | "bottom";

/**
 * 背景遮罩类型
 */
export type BackgroundOverlayType =
	| "none"
	| "light"
	| "dark"
	| "primary"
	| "gradient";

/**
 * Hero 组件属性接口
 */
export interface HeroProps {
	align?: AlignType;
	background?: BackgroundType;
	backgroundImage?: ImageSource;
	backgroundOverlay?: BackgroundOverlayType;
	description: string;
	image?: ImageConfig;
	imagePosition?: ImagePositionType;
	links: IHeroLink[];
	overlayOpacity?: number;
	glassmorphism?: boolean;
	textBackground?: "none" | "glass" | "solid" | "gradient";
	title: string;
}
