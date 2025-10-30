// Vue 容器组件
import BasicVueContainer from "./BasicVueContainer.astro";
import BgTypesVueContainer from "./BgTypesVueContainer.astro";
import CustomHeightVueContainer from "./CustomHeightVueContainer.astro";
import CustomWidthVueContainer from "./CustomWidthVueContainer.astro";
import WithEventsVueContainer from "./WithEventsVueContainer.astro";
import WithSidebarVueContainer from "./WithSidebarVueContainer.astro";
import WithTabsVueContainer from "./WithTabsVueContainer.astro";
import WithToolbarVueContainer from "./WithToolbarVueContainer.astro";

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
	},
};
