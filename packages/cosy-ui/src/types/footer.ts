export interface Logo {
    src: string;
    alt: string;
}

export interface Product {
    name: string;
    href: string;
    external?: boolean;
}

export interface FooterProps {
    siteName: string;
    homeLink: string;
    slogan: string;
    company: string;
    copyright: string;
    inspirationalSlogan: string;
    debug?: boolean;
    icp?: string;
    logo?: Logo;
    products?: Product[];
    aboutLink?: string;
    contactLink?: string;
    termsLink?: string;
    privacyLink?: string;
    socialLinks?: string[];
    teamLink?: string;
    careersLink?: string;
    newsLink?: string;
    historyLink?: string;
    partnersLink?: string;
    blogLink?: string;
    faqLink?: string;
    mediaLink?: string;
    techStackLink?: string;
    /**
     * 语言代码，默认自动检测
     */
    lang?: string;
    /**
     * 是否启用日志输出
     * @default false
     */
    enableLogging?: boolean;
} 