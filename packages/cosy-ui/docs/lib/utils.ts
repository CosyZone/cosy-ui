// 从 astro.config.ts 中获取基础路径
export const getBaseUrl = (): string => {
    return '/cosy-ui';
};

export const homeLink = getBaseUrl();

export const getNavItems = (): {
    href: string;
    label: string;
    match: (path: string) => boolean;
}[] => {
    const basePath = getBaseUrl();
    return [
        {
            href: homeLink,
            label: 'Home',
            match: (path) => path === homeLink,
        },
        {
            href: `${basePath}/demos`,
            label: 'Demos',
            match: (path) => path.startsWith(`${basePath}/demos`),
        },
    ]
};
