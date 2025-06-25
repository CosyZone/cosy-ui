import { LinkUtil } from '@coffic/cosy-ui';

export const configApp = {
    homeLink: LinkUtil.getBaseUrl(),
    basePath: LinkUtil.getBaseUrl(),
    getNavItems: (lang: string) => [
        // {
        // 	href: homeLink,
        // 	label: 'Home',
        // },
        {
            href: `${LinkUtil.getBaseUrl()}${lang}/courses`,
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

    products: [
        { name: 'Cisum', href: 'https://coffic.cn/cisum' },
        { name: 'TravelMode', href: 'https://coffic.cn/en/products/travelmode/' },
        { name: 'GitOK', href: 'https://coffic.cn/gitok' },
        { name: 'Cosy UI', href: 'https://github.com/CofficLab/cosy-ui' },
    ]
};