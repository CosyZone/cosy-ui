// Astro 示例组件
import Basic from './Basic.astro';
import WithToolbar from './WithToolbar.astro';
import WithSidebar from './WithSidebar.astro';
import CustomHeight from './CustomHeight.astro';

// Astro 容器组件
import BasicContainer from './BasicContainer.astro';
import WithTabsContainer from './WithTabsContainer.astro';
import WithEventsContainer from './WithEventsContainer.astro';
import WithToolbarContainer from './WithToolbarContainer.astro';
import WithSidebarContainer from './WithSidebarContainer.astro';
import CustomHeightContainer from './CustomHeightContainer.astro';

// 导出 MacWindow 组件包
export const MacWindowPackage = {
    Containers: {
        Basic: BasicContainer,
        WithTabs: WithTabsContainer,
        WithEvents: WithEventsContainer,
        WithToolbar: WithToolbarContainer,
        WithSidebar: WithSidebarContainer,
        CustomHeight: CustomHeightContainer,
    },
    Examples: {
        Basic: Basic,
        WithToolbar: WithToolbar,
        WithSidebar: WithSidebar,
        CustomHeight: CustomHeight,
    },
};
