import { LinkUtil, type INavItem } from '@/index';

export const homeLink = LinkUtil.getBaseUrl();
export const basePath = LinkUtil.getBaseUrl();
export const navItems: INavItem[] = [
	{
		href: homeLink,
		label: 'Home',
	},
	{
		href: `${basePath}en/courses`,
		label: 'Docs',
	},
	{
		href: `${basePath}demos`,
		label: 'Demos',
	},
];
