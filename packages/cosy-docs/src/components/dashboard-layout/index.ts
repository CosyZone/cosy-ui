// 示例组件
import EDashboardLayoutSidebarSizes from './EDashboardLayoutSidebarSizes.astro';
import EDashboardLayoutSidebarSm from './EDashboardLayoutSidebarSm.astro';
import EDashboardLayoutSidebarMd from './EDashboardLayoutSidebarMd.astro';
import EDashboardLayoutSidebarLg from './EDashboardLayoutSidebarLg.astro';
import EDashboardLayoutSidebarXl from './EDashboardLayoutSidebarXl.astro';

// 主题示例组件
import EDashboardLayoutThemeDefault from './ThemeDefault.astro';
import EDashboardLayoutThemePrimary from './EDashboardLayoutThemePrimary.astro';
import EDashboardLayoutThemeSuccess from './EDashboardLayoutThemeSuccess.astro';
import EDashboardLayoutThemeWarning from './EDashboardLayoutThemeWarning.astro';



// 侧边栏底部自定义内容示例组件
import SidebarFooterUserInfo from './SidebarFooterUserInfo.astro';
import SidebarFooterCopyright from './SidebarFooterCopyright.astro';
import SidebarFooterStatus from './SidebarFooterStatus.astro';

// 容器组件
import BasicContainer from './BasicContainer.astro';
import EDashboardLayoutSidebarSizesContainer from './EDashboardLayoutSidebarSizesContainer.astro';
import EDashboardLayoutSidebarThemesContainer from './ThemesContainer.astro';
import SidebarFooterContainer from './SidebarFooterContainer.astro';
import MainBackgroundContainer from './MainBackgroundContainer.astro';

// 主内容区域背景示例组件
import EDashboardLayoutMainBackgroundTransparent from './EDashboardLayoutMainBackgroundTransparent.astro';
import EDashboardLayoutMainBackgroundBase from './MainBackgroundBase.astro';
import EDashboardLayoutMainBackgroundPrimary from './EDashboardLayoutMainBackgroundPrimary.astro';
import EDashboardLayoutMainBackgroundSuccess from './EDashboardLayoutMainBackgroundSuccess.astro';
import EDashboardLayoutMainBackgroundGradientWarm from './EDashboardLayoutMainBackgroundGradientWarm.astro';
import EDashboardLayoutMainBackgroundGradientCool from './EDashboardLayoutMainBackgroundGradientCool.astro';
import EDashboardLayoutMainBackgroundInfo from './EDashboardLayoutMainBackgroundInfo.astro';
import EDashboardLayoutMainBackgroundGradientSunset from './EDashboardLayoutMainBackgroundGradientSunset.astro';

export {
    // 示例组件
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



    // 侧边栏底部自定义内容示例组件
    SidebarFooterUserInfo,
    SidebarFooterCopyright,
    SidebarFooterStatus,

    // 容器组件
    BasicContainer,
    EDashboardLayoutSidebarSizesContainer,
    EDashboardLayoutSidebarThemesContainer,
    SidebarFooterContainer,
    MainBackgroundContainer,

    // 主内容区域背景示例组件
    EDashboardLayoutMainBackgroundTransparent,
    EDashboardLayoutMainBackgroundBase,
    EDashboardLayoutMainBackgroundPrimary,
    EDashboardLayoutMainBackgroundSuccess,
    EDashboardLayoutMainBackgroundGradientWarm,
    EDashboardLayoutMainBackgroundGradientCool,
    EDashboardLayoutMainBackgroundInfo,
    EDashboardLayoutMainBackgroundGradientSunset
};

// 导出 ComponentPackage 用于文档
export const DashboardLayoutPackage = {
    DashboardLayoutContainers: {
        Basic: BasicContainer,
        SidebarSizes: EDashboardLayoutSidebarSizesContainer,
        SidebarThemes: EDashboardLayoutSidebarThemesContainer,
        SidebarFooter: SidebarFooterContainer,
        MainBackground: MainBackgroundContainer,
    },
}; 
