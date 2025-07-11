import { LinkUtil } from '@coffic/cosy-ui';

export const configApp = {
    homeLink: LinkUtil.getBaseUrl(),
    basePath: LinkUtil.getBaseUrl(),
    getNavItems: (lang: string) => [
        {
            href: `${LinkUtil.getBaseUrl()}${lang}`,
            title: 'Home',
        },
        {
            href: `${LinkUtil.getBaseUrl()}${lang}/courses/guide`,
            title: 'Docs',
        },
        {
            href: `${LinkUtil.getBaseUrl()}${lang}/lessons`,
            title: 'Lessons',
        },
        {
            href: `${LinkUtil.getBaseUrl()}${lang}/demos`,
            title: 'Demos',
        },
    ],
};