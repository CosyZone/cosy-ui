// Astro 示例组件
import EMacWindowBasic from './EMacWindowBasic.astro';
import EMacWindowWithTabs from './EMacWindowWithTabs.astro';
import EMacWindowWithEvents from './EMacWindowWithEvents.astro';
import EMacWindowWithToolbar from './EMacWindowWithToolbar.astro';
import EMacWindowWithSidebar from './EMacWindowWithSidebar.astro';
import EMacWindowCustomHeight from './EMacWindowCustomHeight.astro';

// Astro 容器组件
import EMacWindowBasicContainer from './EMacWindowBasicContainer.astro';
import EMacWindowWithTabsContainer from './EMacWindowWithTabsContainer.astro';
import EMacWindowWithEventsContainer from './EMacWindowWithEventsContainer.astro';
import EMacWindowWithToolbarContainer from './EMacWindowWithToolbarContainer.astro';
import EMacWindowWithSidebarContainer from './EMacWindowWithSidebarContainer.astro';
import EMacWindowCustomHeightContainer from './EMacWindowCustomHeightContainer.astro';

// 导出 MacWindow 组件包
export const MacWindowPackage = {
    MacWindowContainers: {
        Basic: EMacWindowBasicContainer,
        WithTabs: EMacWindowWithTabsContainer,
        WithEvents: EMacWindowWithEventsContainer,
        WithToolbar: EMacWindowWithToolbarContainer,
        WithSidebar: EMacWindowWithSidebarContainer,
        CustomHeight: EMacWindowCustomHeightContainer,
    },
    MacWindowExamples: {
        Basic: EMacWindowBasic,
        WithTabs: EMacWindowWithTabs,
        WithEvents: EMacWindowWithEvents,
        WithToolbar: EMacWindowWithToolbar,
        WithSidebar: EMacWindowWithSidebar,
        CustomHeight: EMacWindowCustomHeight,
    },
};