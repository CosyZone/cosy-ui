// Astro 容器组件
import BasicContainer from './BasicContainer.astro';
import WithTabsContainer from './WithTabsContainer.astro';
import WithEventsContainer from './WithEventsContainer.astro';
import WithToolbarContainer from './WithToolbarContainer.astro';
import WithSidebarContainer from './WithSidebarContainer.astro';
import CustomHeightContainer from './CustomHeightContainer.astro';
import CustomWidthContainer from './CustomWidth.astro';
import BgTypesContainer from './BgTypesContainer.astro';

// 导出 MacWindow 组件包
export const MacWindowPackage = {
    Containers: {
        Basic: BasicContainer,
        WithTabs: WithTabsContainer,
        WithEvents: WithEventsContainer,
        WithToolbar: WithToolbarContainer,
        WithSidebar: WithSidebarContainer,
        CustomHeight: CustomHeightContainer,
        CustomWidth: CustomWidthContainer,
        BgTypes: BgTypesContainer,
    }
};
