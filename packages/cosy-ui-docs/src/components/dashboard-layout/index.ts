/**
 * 文档项目中的 Dashboard Layout 示例组件
 */

// 示例组件
import EDashboardLayoutCustomStyle from './EDashboardLayoutCustomStyle.astro.js';
import EDashboardLayoutSidebarSizes from './EDashboardLayoutSidebarSizes.astro.js';
import EDashboardLayoutSidebarSm from './EDashboardLayoutSidebarSm.astro.js';
import EDashboardLayoutSidebarMd from './EDashboardLayoutSidebarMd.astro.js';
import EDashboardLayoutSidebarLg from './EDashboardLayoutSidebarLg.astro.js';
import EDashboardLayoutSidebarXl from './EDashboardLayoutSidebarXl.astro.js';

// 主题示例组件
import EDashboardLayoutThemeDefault from './EDashboardLayoutThemeDefault.astro.js';
import EDashboardLayoutThemePrimary from './EDashboardLayoutThemePrimary.astro.js';
import EDashboardLayoutThemeSuccess from './EDashboardLayoutThemeSuccess.astro.js';
import EDashboardLayoutThemeWarning from './EDashboardLayoutThemeWarning.astro.js';



// 侧边栏底部自定义内容示例组件
import EDashboardLayoutSidebarFooterUserInfo from './EDashboardLayoutSidebarFooterUserInfo.astro.js';
import EDashboardLayoutSidebarFooterCopyright from './EDashboardLayoutSidebarFooterCopyright.astro.js';
import EDashboardLayoutSidebarFooterStatus from './EDashboardLayoutSidebarFooterStatus.astro.js';

// 容器组件
import EDashboardLayoutBasicContainer from './EDashboardLayoutBasicContainer.astro.js';
import EDashboardLayoutCustomStyleContainer from './EDashboardLayoutCustomStyleContainer.astro.js';
import EDashboardLayoutSidebarSizesContainer from './EDashboardLayoutSidebarSizesContainer.astro.js';
import EDashboardLayoutSidebarThemesContainer from './EDashboardLayoutSidebarThemesContainer.astro.js';
import EDashboardLayoutSidebarFooterContainer from './EDashboardLayoutSidebarFooterContainer.astro.js';
import EDashboardLayoutMainBackgroundContainer from './EDashboardLayoutMainBackgroundContainer.astro.js';

// 主内容区域背景示例组件
import EDashboardLayoutMainBackgroundTransparent from './EDashboardLayoutMainBackgroundTransparent.astro.js';
import EDashboardLayoutMainBackgroundBase from './EDashboardLayoutMainBackgroundBase.astro.js';
import EDashboardLayoutMainBackgroundPrimary from './EDashboardLayoutMainBackgroundPrimary.astro.js';
import EDashboardLayoutMainBackgroundSuccess from './EDashboardLayoutMainBackgroundSuccess.astro.js';
import EDashboardLayoutMainBackgroundGradientWarm from './EDashboardLayoutMainBackgroundGradientWarm.astro.js';
import EDashboardLayoutMainBackgroundGradientCool from './EDashboardLayoutMainBackgroundGradientCool.astro.js';
import EDashboardLayoutMainBackgroundInfo from './EDashboardLayoutMainBackgroundInfo.astro.js';
import EDashboardLayoutMainBackgroundGradientSunset from './EDashboardLayoutMainBackgroundGradientSunset.astro.js';

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