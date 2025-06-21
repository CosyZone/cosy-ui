/**
 * 文档项目中的 Dashboard Layout 示例组件
 */

// 示例组件
import EDashboardLayoutCustomStyle from './EDashboardLayoutCustomStyle.astro';
import EDashboardLayoutSidebarSizes from './EDashboardLayoutSidebarSizes.astro';
import EDashboardLayoutSidebarSm from './EDashboardLayoutSidebarSm.astro';
import EDashboardLayoutSidebarMd from './EDashboardLayoutSidebarMd.astro';
import EDashboardLayoutSidebarLg from './EDashboardLayoutSidebarLg.astro';
import EDashboardLayoutSidebarXl from './EDashboardLayoutSidebarXl.astro';

// 主题示例组件
import EDashboardLayoutThemeDefault from './EDashboardLayoutThemeDefault.astro';
import EDashboardLayoutThemePrimary from './EDashboardLayoutThemePrimary.astro';
import EDashboardLayoutThemeSuccess from './EDashboardLayoutThemeSuccess.astro';
import EDashboardLayoutThemeWarning from './EDashboardLayoutThemeWarning.astro';

// 内容主题示例组件
import EDashboardLayoutContentCard from './EDashboardLayoutContentCard.astro';
import EDashboardLayoutContentTransparent from './EDashboardLayoutContentTransparent.astro';
import EDashboardLayoutContentPrimary from './EDashboardLayoutContentPrimary.astro';

// 容器组件
import EDashboardLayoutBasicContainer from './EDashboardLayoutBasicContainer.astro';
import EDashboardLayoutCustomStyleContainer from './EDashboardLayoutCustomStyleContainer.astro';
import EDashboardLayoutSidebarSizesContainer from './EDashboardLayoutSidebarSizesContainer.astro';
import EDashboardLayoutSidebarThemesContainer from './EDashboardLayoutSidebarThemesContainer.astro';
import EDashboardLayoutContentThemesContainer from './EDashboardLayoutContentThemesContainer.astro';

export {
    // 示例组件
    EDashboardLayoutCustomStyle,
    EDashboardLayoutSidebarSizes,
    EDashboardLayoutSidebarSm,
    EDashboardLayoutSidebarMd,
    EDashboardLayoutSidebarLg,
    EDashboardLayoutSidebarXl,

    // 主题示例组件
    EDashboardLayoutThemeDefault,
    EDashboardLayoutThemePrimary,
    EDashboardLayoutThemeSuccess,
    EDashboardLayoutThemeWarning,

    // 内容主题示例组件
    EDashboardLayoutContentCard,
    EDashboardLayoutContentTransparent,
    EDashboardLayoutContentPrimary,

    // 容器组件
    EDashboardLayoutBasicContainer,
    EDashboardLayoutCustomStyleContainer,
    EDashboardLayoutSidebarSizesContainer,
    EDashboardLayoutSidebarThemesContainer,
    EDashboardLayoutContentThemesContainer
};

// 导出 ComponentPackage 用于文档
export const DashboardLayoutPackage = {
    DashboardLayoutContainers: {
        Basic: EDashboardLayoutBasicContainer,
        CustomStyle: EDashboardLayoutCustomStyleContainer,
        SidebarSizes: EDashboardLayoutSidebarSizesContainer,
        SidebarThemes: EDashboardLayoutSidebarThemesContainer,
        ContentThemes: EDashboardLayoutContentThemesContainer,
    },
}; 