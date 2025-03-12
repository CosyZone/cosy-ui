import type { Component } from 'vue';

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
        type: 'svg' | 'image' | 'component';
        content: string;
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
    config: {
        homeLink: string;
        siteName: string;
        slogan: string;
        socialLinks: Array<{
            name: string;
            url: string;
            icon: {
                type: 'svg' | 'image' | 'component';
                content: string | Component;
            };
        }>;
        navGroups: Array<{
            titleKey: string;
            links: Array<{
                href: string;
                text: string;
                external?: boolean;
            }>;
        }>;
        inspirationalSlogan: string;
        company: string;
        copyright: string;
        icp?: string;
    };
} 