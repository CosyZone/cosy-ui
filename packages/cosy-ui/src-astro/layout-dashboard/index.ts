/**
 * 仪表盘布局组件
 */

import DashboardLayout from './DashboardLayout.astro';
import DashboardSidebar from './DashboardSidebar.astro';
import DashboardTopNavbar from './DashboardTopNavbar.astro';
import DashboardLayoutBasic from './DashboardLayoutBasic.astro';
import EDashboardLayoutCustomStyle from './EDashboardLayoutCustomStyle.astro';
import EDashboardLayoutSidebarSizes from './EDashboardLayoutSidebarSizes.astro';
import EDashboardLayoutSidebarSm from './EDashboardLayoutSidebarSm.astro';
import EDashboardLayoutSidebarMd from './EDashboardLayoutSidebarMd.astro';
import EDashboardLayoutSidebarLg from './EDashboardLayoutSidebarLg.astro';
import EDashboardLayoutSidebarXl from './EDashboardLayoutSidebarXl.astro';
import EDashboardLayoutThemeDefault from './EDashboardLayoutThemeDefault.astro';
import EDashboardLayoutThemePrimary from './EDashboardLayoutThemePrimary.astro';
import EDashboardLayoutThemeSuccess from './EDashboardLayoutThemeSuccess.astro';
import EDashboardLayoutThemeWarning from './EDashboardLayoutThemeWarning.astro';
import EDashboardLayoutContentCard from './EDashboardLayoutContentCard.astro';
import EDashboardLayoutContentTransparent from './EDashboardLayoutContentTransparent.astro';
import EDashboardLayoutContentPrimary from './EDashboardLayoutContentPrimary.astro';
import EDashboardLayoutBasicContainer from './EDashboardLayoutBasicContainer.astro';
import EDashboardLayoutCustomStyleContainer from './EDashboardLayoutCustomStyleContainer.astro';
import EDashboardLayoutSidebarSizesContainer from './EDashboardLayoutSidebarSizesContainer.astro';
import EDashboardLayoutSidebarThemesContainer from './EDashboardLayoutSidebarThemesContainer.astro';
import EDashboardLayoutContentThemesContainer from './EDashboardLayoutContentThemesContainer.astro';
export {
  DashboardLayout,
  DashboardSidebar,
  DashboardTopNavbar,
  DashboardLayoutBasic,
  EDashboardLayoutCustomStyle,
  EDashboardLayoutSidebarSizes,
  EDashboardLayoutSidebarSm,
  EDashboardLayoutSidebarMd,
  EDashboardLayoutSidebarLg,
  EDashboardLayoutSidebarXl,
  EDashboardLayoutThemeDefault,
  EDashboardLayoutThemePrimary,
  EDashboardLayoutThemeSuccess,
  EDashboardLayoutThemeWarning,
  EDashboardLayoutContentCard,
  EDashboardLayoutContentTransparent,
  EDashboardLayoutContentPrimary,
  EDashboardLayoutBasicContainer,
  EDashboardLayoutCustomStyleContainer,
  EDashboardLayoutSidebarSizesContainer,
  EDashboardLayoutSidebarThemesContainer,
  EDashboardLayoutContentThemesContainer
};

// 导出类型和函数
export type { NavItem, SidebarSize, SidebarTheme, ContentTheme } from './types';
export { getIconFromHref, getNavItemIcon, getSidebarWidth, getSidebarTheme, getContentTheme } from './types';

// 导出ComponentPackage
export const DashboardLayoutPackage = {
  DashboardLayout,
  DashboardLayoutContainers: {
    Basic: EDashboardLayoutBasicContainer,
    CustomStyle: EDashboardLayoutCustomStyleContainer,
    SidebarSizes: EDashboardLayoutSidebarSizesContainer,
    SidebarThemes: EDashboardLayoutSidebarThemesContainer,
    ContentThemes: EDashboardLayoutContentThemesContainer,
  },
};
