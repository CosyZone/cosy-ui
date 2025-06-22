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



// 侧边栏底部自定义内容示例组件
import EDashboardLayoutSidebarFooterUserInfo from './EDashboardLayoutSidebarFooterUserInfo.astro';
import EDashboardLayoutSidebarFooterCopyright from './EDashboardLayoutSidebarFooterCopyright.astro';
import EDashboardLayoutSidebarFooterStatus from './EDashboardLayoutSidebarFooterStatus.astro';

// 容器组件
import EDashboardLayoutBasicContainer from './EDashboardLayoutBasicContainer.astro';
import EDashboardLayoutCustomStyleContainer from './EDashboardLayoutCustomStyleContainer.astro';
import EDashboardLayoutSidebarSizesContainer from './EDashboardLayoutSidebarSizesContainer.astro';
import EDashboardLayoutSidebarThemesContainer from './EDashboardLayoutSidebarThemesContainer.astro';
import EDashboardLayoutSidebarFooterContainer from './EDashboardLayoutSidebarFooterContainer.astro';
import EDashboardLayoutMainBackgroundContainer from './EDashboardLayoutMainBackgroundContainer.astro';

// 主内容区域背景示例组件
import EDashboardLayoutMainBackgroundTransparent from './EDashboardLayoutMainBackgroundTransparent.astro';
import EDashboardLayoutMainBackgroundBase from './EDashboardLayoutMainBackgroundBase.astro';
import EDashboardLayoutMainBackgroundPrimary from './EDashboardLayoutMainBackgroundPrimary.astro';
import EDashboardLayoutMainBackgroundSuccess from './EDashboardLayoutMainBackgroundSuccess.astro';
import EDashboardLayoutMainBackgroundGradientWarm from './EDashboardLayoutMainBackgroundGradientWarm.astro';
import EDashboardLayoutMainBackgroundGradientCool from './EDashboardLayoutMainBackgroundGradientCool.astro';
import EDashboardLayoutMainBackgroundInfo from './EDashboardLayoutMainBackgroundInfo.astro';
import EDashboardLayoutMainBackgroundGradientSunset from './EDashboardLayoutMainBackgroundGradientSunset.astro';

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



    // 侧边栏底部自定义内容示例组件
    EDashboardLayoutSidebarFooterUserInfo,
    EDashboardLayoutSidebarFooterCopyright,
    EDashboardLayoutSidebarFooterStatus,

    // 容器组件
    EDashboardLayoutBasicContainer,
    EDashboardLayoutCustomStyleContainer,
    EDashboardLayoutSidebarSizesContainer,
    EDashboardLayoutSidebarThemesContainer,
    EDashboardLayoutSidebarFooterContainer,
    EDashboardLayoutMainBackgroundContainer,

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
        Basic: EDashboardLayoutBasicContainer,
        CustomStyle: EDashboardLayoutCustomStyleContainer,
        SidebarSizes: EDashboardLayoutSidebarSizesContainer,
        SidebarThemes: EDashboardLayoutSidebarThemesContainer,
        SidebarFooter: EDashboardLayoutSidebarFooterContainer,
        MainBackground: EDashboardLayoutMainBackgroundContainer,
    },
}; 