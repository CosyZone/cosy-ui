import BasicContainer from './BasicContainer.astro';
import ClassContainer from './ClassContainer.astro';
import ClassListContainer from './ClassListContainer.astro';
import DefaultSlotContainer from './DefaultSlotContainer.astro';
import LoadingDelayContainer from './LoadingDelayContainer.astro';
import MainContentConfigContainer from './MainContentConfigContainer.astro';
import MetaConfigContainer from './MetaConfigContainer.astro';
import ModalSearchSlotContainer from './ModalSearchSlotContainer.astro';
import NavbarCenterSlotContainer from './NavbarCenterSlotContainer.astro';
import NavbarEndSlotContainer from './NavbarEndSlotContainer.astro';
import NavbarStartSlotContainer from './NavbarStartSlotContainer.astro';
import ShowFooterContainer from './ShowFooterContainer.astro';
import ShowHeaderContainer from './ShowHeaderContainer.astro';
import ShowSidebarContainer from './ShowSidebarContainer.astro';
import SidebarConfigContainer from './SidebarConfigContainer.astro';
import Basic from './Basic.astro';

// 导出 ComponentPackage 用于文档
export const AppLayoutPackage = {
    Basic: Basic,
    BasicContainer: BasicContainer,
    Class: ClassContainer,
    ClassList: ClassListContainer,
    DefaultSlot: DefaultSlotContainer,
    LoadingDelay: LoadingDelayContainer,
    MainContentConfig: MainContentConfigContainer,
    MetaConfig: MetaConfigContainer,
    ModalSearchSlot: ModalSearchSlotContainer,
    NavbarCenterSlot: NavbarCenterSlotContainer,
    NavbarEndSlot: NavbarEndSlotContainer,
    NavbarStartSlot: NavbarStartSlotContainer,
    ShowFooter: ShowFooterContainer,
    ShowHeader: ShowHeaderContainer,
    ShowSidebar: ShowSidebarContainer,
    SidebarConfig: SidebarConfigContainer,
}; 
