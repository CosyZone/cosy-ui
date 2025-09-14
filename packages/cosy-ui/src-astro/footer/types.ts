export interface FooterICPProps {
    icp: string;
    icpLink?: string;
    debugClasses?: {
        icp?: string;
    };
}

export interface FooterCopyrightProps {
    company: string;
    copyright?: string;
    currentYear: number;
    t?: (key: string) => string;
    debugClasses?: {
        footer?: string;
        aside?: string;
    };
}

export interface FooterSectionProps {
    title: string;
    links: Array<{
        name: string;
        href?: string;
        external?: boolean;
    }>;
}

import type { ImageSource } from '../image/image';

export interface FooterBrandProps {
    siteName: string;
    homeLink: string;
    slogan: string;
    logo?: {
        src: string;
        alt: string;
    };
    socialLinks?: Array<{
        url: string;
        platform: string;
        name: string;
    }>;
    wechatQR?: ImageSource;
    whatsappQR?: ImageSource;
    debug?: boolean;
} 
