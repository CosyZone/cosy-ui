export interface IImageDisplayProps {
    images: string[];
    size?: 'sm' | 'md' | 'lg';
    showPreview?: boolean;
    maxDisplay?: number;
}

export interface IImageDisplayEmits {
    (e: 'imageClick', imageUrl: string): void;
}
