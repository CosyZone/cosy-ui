import { LinkUtil, type INavItem } from '../src/index';

export const homeLink = LinkUtil.getBaseUrl();
export const basePath = LinkUtil.getBaseUrl();
export const navItems: INavItem[] = [
	{
		href: homeLink,
		label: 'Home',
	},
	{
		href: `${homeLink}courses`,
		label: 'Docs',
	},
	{
		href: `${basePath}demos`,
		label: 'Demos',
	},
];
