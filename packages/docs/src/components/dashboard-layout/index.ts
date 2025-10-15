// 容器组件
import BasicContainer from "./BasicContainer.astro";
import SidebarSizesContainer from "./SidebarSizesContainer.astro";
import SidebarFooterContainer from "./SidebarFooterContainer.astro";
import LongContentContainer from "./LongContentContainer.astro";

// 导出 ComponentPackage 用于文档
export const DashboardLayoutPackage = {
	DashboardLayoutContainers: {
		Basic: BasicContainer,
		SidebarSizes: SidebarSizesContainer,
		SidebarFooter: SidebarFooterContainer,
		LongContent: LongContentContainer,
	},
};
