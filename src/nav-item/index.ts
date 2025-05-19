import NavItems from './NavItems.astro';
import NavItemsBasic from './NavItemsBasic.astro';
import BasicSourceCode from './NavItemsBasic.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { NavItems, NavItemsBasic };

// 导出示例源代码
export const NavItemsExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, 'NavItems'),
};
