import { LinkUtil, type INavItem } from '@cosy/index';

export const homeLink = LinkUtil.getBaseUrl();
export const basePath = LinkUtil.getBaseUrl();
export const navItems: INavItem[] = [
	// {
	// 	href: homeLink,
	// 	label: 'Home',
	// },
	{
		href: `${basePath}en/courses`,
		label: 'Docs',
	},
	// {
	// 	href: `${basePath}en/lessons`,
	// 	label: 'Lessons',
	// },
	{
		href: `${basePath}demos`,
		label: 'Demos',
	},
];
