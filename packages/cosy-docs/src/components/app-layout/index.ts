import BasicContainer from './BasicContainer.astro';
import ClassContainer from './ClassContainer.astro';
import ClassListContainer from './ClassListContainer.astro';
import DebugContainer from './DebugContainer.astro';
import DefaultSlotContainer from './DefaultSlotContainer.astro';
import FooterConfigContainer from './FooterConfigContainer.astro';
import HeaderConfigContainer from './HeaderConfigContainer.astro';
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

// 导出 ComponentPackage 用于文档
export const AppLayoutPackage = {
    Basic: BasicContainer,
    Class: ClassContainer,
    ClassList: ClassListContainer,
    Debug: DebugContainer,
    DefaultSlot: DefaultSlotContainer,
    FooterConfig: FooterConfigContainer,
    HeaderConfig: HeaderConfigContainer,
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
