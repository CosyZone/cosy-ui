/// <reference types="astro/client" />

declare module 'astro:assets' {
    export interface ImageMetadata {
        src: string;
        width: number;
        height: number;
        format: string;
    }

    export const Image: any;
}

declare module 'astro/jsx-runtime' {
    namespace JSX {
        interface IntrinsicElements {
            [name: string]: any;
        }
    }
}

declare module 'astro' {
    export interface HTMLAttributes<T> {
        [name: string]: any;
    }

    export type ImageMetadata = {
        src: string;
        width: number;
        height: number;
        format: string;
    };
} 