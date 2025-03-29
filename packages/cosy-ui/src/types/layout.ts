export interface SidebarItem {
    href: string;
    text: string;
    items?: SidebarItem[];
}

export interface SidebarSection {
    title: string;
    items: SidebarItem[];
}
