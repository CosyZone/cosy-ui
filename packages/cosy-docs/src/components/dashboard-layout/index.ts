// 容器组件
import BasicContainer from "./BasicContainer.astro";
import LongContentContainer from "./LongContentContainer.astro";
import SidebarFooterContainer from "./SidebarFooterContainer.astro";
import SidebarSizesContainer from "./SidebarSizesContainer.astro";

// 导出 ComponentPackage 用于文档
export const DashboardLayoutPackage = {
	DashboardLayoutContainers: {
		Basic: BasicContainer,
		SidebarSizes: SidebarSizesContainer,
		SidebarFooter: SidebarFooterContainer,
		LongContent: LongContentContainer,
	},
};
