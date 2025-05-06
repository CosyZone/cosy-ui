import { LinkUtil } from "../../src/index";

export const homeLink = LinkUtil.getBaseUrl();
export const basePath = LinkUtil.getBaseUrl();

export const getNavItems = (): {
    href: string;
    label: string;
    match: (path: string) => boolean;
}[] => {
    return [
        {
            href: homeLink,
            label: 'Home',
            match: (path) => path === homeLink,
        },
        {
            href: `${basePath}demos`,
            label: 'Demos',
            match: (path) => path.startsWith(`${basePath}demos`),
        },
    ]
};
