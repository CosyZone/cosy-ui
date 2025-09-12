export interface Image3Item {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    loading?: 'lazy' | 'eager';
}

export interface Image3Props {
    images: [Image3Item, Image3Item, Image3Item];
    class?: string;
    tiltAngle?: number;
    spacing?: 'sm' | 'md' | 'lg';
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}
