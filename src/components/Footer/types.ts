import type { ImageMetadata } from 'astro';

export interface FooterLink {
    key: string;
    href: string;
    external: boolean;
    text: string;
}

export interface NavGroup {
    titleKey: string;
    links: FooterLink[];
}

export interface SocialLink {
    name: string;
    url: string;
    icon: {
        type: 'svg' | 'image' | 'component' | 'astro-image';
        content: string | ImageMetadata;
    };
}

export interface FooterConfig {
    homeLink: string;
    siteName: string;
    slogan: string;
    socialLinks: SocialLink[];
    navGroups: NavGroup[];
    inspirationalSlogan: string;
    company: string;
    copyright: string;
    icp?: string;
}

export interface FooterProps {
    config: FooterConfig;
} 