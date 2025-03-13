

export interface FooterLink {
    key: string;
    href: string;
    external: boolean;
    text: string;
}

export interface FooterNavGroup {
    titleKey: string;
    links: FooterLink[];
}