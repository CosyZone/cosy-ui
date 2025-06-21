/**
 * 仪表盘布局组件
 */

import DashboardLayout from './DashboardLayout.astro';
import DashboardSidebar from './DashboardSidebar.astro';
import DashboardTopNavbar from './DashboardTopNavbar.astro';

export {
  DashboardLayout,
  DashboardSidebar,
  DashboardTopNavbar
};

// 导出类型和函数
export type { NavItem, SidebarSize, SidebarTheme, ContentTheme } from './types';
export { getIconFromHref, getNavItemIcon, getSidebarWidth, getSidebarTheme, getContentTheme } from './types';
