/**
 * 仪表盘布局组件
 */

import DashboardLayout from './DashboardLayout.astro';
import DashboardSidebar from './DashboardSidebar.astro';
import DashboardTopNavbar from './DashboardTopNavbar.astro';
import DashboardLayoutBasic from './DashboardLayoutBasic.astro';
import EDashboardLayoutCustomStyle from './EDashboardLayoutCustomStyle.astro';
import EDashboardLayoutBasicContainer from './EDashboardLayoutBasicContainer.astro';
import EDashboardLayoutCustomStyleContainer from './EDashboardLayoutCustomStyleContainer.astro';
import BasicSourceCode from './DashboardLayoutBasic.astro?raw';
import CustomStyleSourceCode from './EDashboardLayoutCustomStyle.astro?raw';
import { extractSimpleExample } from '../utils/component';

export {
  DashboardLayout,
  DashboardSidebar,
  DashboardTopNavbar,
  DashboardLayoutBasic,
  EDashboardLayoutCustomStyle,
  EDashboardLayoutBasicContainer,
  EDashboardLayoutCustomStyleContainer
};

// 导出类型和函数
export type { NavItem } from './types';
export { getIconFromHref, getNavItemIcon } from './types';

// 导出示例源代码
export const DashboardLayoutExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'DashboardLayout'),
  CustomStyle: extractSimpleExample(CustomStyleSourceCode, 'DashboardLayout'),
};

// 导出ComponentPackage
export const DashboardLayoutPackage = {
  DashboardLayout,
  DashboardLayoutContainers: {
    Basic: EDashboardLayoutBasicContainer,
    CustomStyle: EDashboardLayoutCustomStyleContainer,
  },
};
