import type { BackgroundColor } from '../../src/common/backgrounds';

export interface IImagesCircleItem {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    loading?: 'lazy' | 'eager';
    caption?: string;
}

export interface IImagesCircleProps {
    images: IImagesCircleItem[];
    background?: BackgroundColor;
    class?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    spacing?: 'sm' | 'md' | 'lg' | 'xl';
}
