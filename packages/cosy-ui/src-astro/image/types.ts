import type { ImageMetadata } from "astro";
import type {
	BorderSize,
	MaskType,
	RoundedSize,
	ShadowSize,
} from "../../src/common";
export type ImageSource = string | ImageMetadata;

export interface IImageProps {
	alt: string;
	border?: BorderSize;
	class?: string;
	height?: number;
	hover?: "none" | "scale" | "brightness" | "blur";
	lazy?: boolean;
	loading?: "lazy" | "eager";
	loadingIndicator?: "pulse" | "spinner" | "progress" | "skeleton";
	objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
	objectPosition?: string;
	rounded?: RoundedSize;
	mask?: MaskType;
	shadow?: ShadowSize;
	showError?: boolean;
	showPlaceholder?: boolean;
	src: ImageSource;
	tooltip?: string;
	tooltipPlacement?: "top" | "bottom" | "left" | "right";
	tooltipColor?:
		| "neutral"
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error";
	tooltipOpen?: boolean;
	transition?: "none" | "fade" | "slide" | "zoom";
	width?: number;
	asBackground?: boolean;
	preview?: boolean;
	layout?: string;
}
