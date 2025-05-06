import { LinkUtil, type NavItem } from "../../src/index";

export const homeLink = LinkUtil.getBaseUrl();
export const basePath = LinkUtil.getBaseUrl();

export const getNavItems = (): NavItem[] => {
    return [
        {
            href: homeLink,
            label: 'Home'
        },
        {
            href: `${basePath}demos`,
            label: 'Demos'
        },
    ]
};
