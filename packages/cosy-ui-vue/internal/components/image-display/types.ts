export interface IImageDisplayProps {
	images: string[];
	size?: "sm" | "md" | "lg";
	showPreview?: boolean;
	maxDisplay?: number;
}

export type IImageDisplayEmits = (e: "imageClick", imageUrl: string) => void;
