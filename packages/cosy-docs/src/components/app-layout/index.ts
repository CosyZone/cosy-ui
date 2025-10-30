import Basic from "./Basic.astro";
import BasicBuilder from "./BasicBuilder.astro";
import BasicContainer from "./BasicContainer.astro";
import DefaultSlotContainer from "./DefaultSlotContainer.astro";
import ModalSearchSlotContainer from "./ModalSearchSlotContainer.astro";
import NavbarCenterSlotContainer from "./NavbarCenterSlotContainer.astro";
import NavbarEndSlotContainer from "./NavbarEndSlotContainer.astro";
import NavbarStartSlotContainer from "./NavbarStartSlotContainer.astro";
import SidebarConfigContainer from "./SidebarConfigContainer.astro";

// 导出 ComponentPackage 用于文档
export const AppLayoutPackage = {
	Basic: Basic,
	BasicBuilder: BasicBuilder,
	BasicContainer: BasicContainer,
	DefaultSlot: DefaultSlotContainer,
	ModalSearchSlot: ModalSearchSlotContainer,
	NavbarCenterSlot: NavbarCenterSlotContainer,
	NavbarEndSlot: NavbarEndSlotContainer,
	NavbarStartSlot: NavbarStartSlotContainer,
	SidebarConfig: SidebarConfigContainer,
};
