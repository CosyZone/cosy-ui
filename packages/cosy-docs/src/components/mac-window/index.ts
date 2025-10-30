// 容器组件（支持 Astro 和 Vue）
import BasicContainer from "./BasicContainer.astro";
import BgTypesContainer from "./BgTypesContainer.astro";
import CustomHeightContainer from "./CustomHeightContainer.astro";
import CustomWidthContainer from "./CustomWidth.astro";
import WithEventsContainer from "./WithEventsContainer.astro";
import WithSidebarContainer from "./WithSidebarContainer.astro";
import WithTabsContainer from "./WithTabsContainer.astro";
import WithToolbarContainer from "./WithToolbarContainer.astro";

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
    },
};
