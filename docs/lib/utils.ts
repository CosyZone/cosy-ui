import { LinkUtil, type INavItem } from '../../src/index';

export const homeLink = LinkUtil.getBaseUrl();
export const basePath = LinkUtil.getBaseUrl();

export const getNavItems = (): INavItem[] => {
	return [
		{
			href: homeLink,
			label: 'Home',
		},
		{
			href: `${basePath}demos`,
			label: 'Demos',
		},
	];
};
