// Vue 容器组件
import BasicVueContainer from './BasicVueContainer.astro';
import WithTabsVueContainer from './WithTabsVueContainer.astro';
import WithEventsVueContainer from './WithEventsVueContainer.astro';
import WithToolbarVueContainer from './WithToolbarVueContainer.astro';
import WithSidebarVueContainer from './WithSidebarVueContainer.astro';
import CustomHeightVueContainer from './CustomHeightVueContainer.astro';
import CustomWidthVueContainer from './CustomWidthVueContainer.astro';
import BgTypesVueContainer from './BgTypesVueContainer.astro';

// 导出 MacWindow Vue 组件包
export const MacWindowVuePackage = {
    Containers: {
        Basic: BasicVueContainer,
        WithTabs: WithTabsVueContainer,
        WithEvents: WithEventsVueContainer,
        WithToolbar: WithToolbarVueContainer,
        WithSidebar: WithSidebarVueContainer,
        CustomHeight: CustomHeightVueContainer,
        CustomWidth: CustomWidthVueContainer,
        BgTypes: BgTypesVueContainer,
    }
};
