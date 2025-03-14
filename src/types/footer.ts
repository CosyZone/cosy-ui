export interface Logo {
    src: string;
    alt: string;
}

export interface Product {
    name: string;
    href: string;
    external?: boolean;
}

export interface SocialLink {
    name: string;
    url: string;
    platform: string;
}

export interface FooterProps {
    siteName: string;
    homeLink: string;
    slogan: string;
    company: string;
    copyright: string;
    inspirationalSlogan: string;
    icp?: string;
    logo?: Logo;
    products?: Product[];
    aboutLink?: string;
    contactLink?: string;
    termsLink?: string;
    privacyLink?: string;
    socialLinks?: SocialLink[];
} 