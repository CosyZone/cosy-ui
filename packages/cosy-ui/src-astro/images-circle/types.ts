import type { BackgroundColor } from "../../src/common/backgrounds";
import type { ImageSource } from "../image/types";

export interface IImagesCircleItem {
	src: ImageSource;
	alt: string;
}

export interface IImagesCircleProps {
	images: ImageSource[];
	background?: BackgroundColor;
	class?: string;
	size?: "sm" | "md" | "lg" | "xl";
	shadow?: "none" | "sm" | "md" | "lg" | "xl";
	rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
	spacing?: "sm" | "md" | "lg" | "xl";
}
