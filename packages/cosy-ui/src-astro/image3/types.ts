import type { BackgroundColor } from '../../src/common/backgrounds';


export interface IImage3Item {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    loading?: 'lazy' | 'eager';
}

export interface IImage3Props {
    images: [IImage3Item, IImage3Item, IImage3Item];
    background?: BackgroundColor;
    class?: string;
    spacing?: 'sm' | 'md' | 'lg';
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}
