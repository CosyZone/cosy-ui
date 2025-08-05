import BasicContainer from './BasicContainer.astro';
import DebugContainer from './DebugContainer.astro';
import FooterConfigContainer from './FooterConfigContainer.astro';
import HeaderConfigContainer from './HeaderConfigContainer.astro';
import LoadingDelayContainer from './LoadingDelayContainer.astro';
import MainContentConfigContainer from './MainContentConfigContainer.astro';
import MetaConfigContainer from './MetaConfigContainer.astro';
import ShowFooterContainer from './ShowFooterContainer.astro';
import ShowHeaderContainer from './ShowHeaderContainer.astro';
import ShowSidebarContainer from './ShowSidebarContainer.astro';
import SidebarConfigContainer from './SidebarConfigContainer.astro';

// 导出 ComponentPackage 用于文档
export const AppLayoutPackage = {
    Basic: BasicContainer,
    Debug: DebugContainer,
    FooterConfig: FooterConfigContainer,
    HeaderConfig: HeaderConfigContainer,
    LoadingDelay: LoadingDelayContainer,
    MainContentConfig: MainContentConfigContainer,
    MetaConfig: MetaConfigContainer,
    ShowFooter: ShowFooterContainer,
    ShowHeader: ShowHeaderContainer,
    ShowSidebar: ShowSidebarContainer,
    SidebarConfig: SidebarConfigContainer,
}; 
