import { LinkUtil, type INavItem } from '@coffic/cosy-ui';

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

export const products = [
  { name: 'Cisum', href: 'https://coffic.cn/cisum' },
  { name: 'TravelMode', href: 'https://coffic.cn/en/products/travelmode/' },
  { name: 'GitOK', href: 'https://coffic.cn/gitok' },
  { name: 'Cosy UI', href: 'https://github.com/CofficLab/cosy-ui' },
];
