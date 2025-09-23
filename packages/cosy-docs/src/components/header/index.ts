import Basic from './Basic.astro';
import HeightContainer from './HeightContainer.astro';
import NavPositionContainer from './NavPositionContainer.astro';
import StickyContainer from './StickyContainer.astro';
import NavbarStartSlotContainer from './NavbarStartSlotContainer.astro';
import NavbarCenterSlotContainer from './NavbarCenterSlotContainer.astro';
import NavbarEndSlotContainer from './NavbarEndSlotContainer.astro';
import NavPositionStart from './NavPositionStart.astro';
import NavPositionCenter from './NavPositionCenter.astro';
import NavPositionEnd from './NavPositionEnd.astro';
import BackgroundContainer from './BackgroundContainer.astro';
import ShadowContainer from './ShadowContainer.astro';
import TextColorContainer from './TextColorContainer.astro';

export const HeaderPackage = {
    Basic,
    HeightContainer,
    NavPositionContainer,
    StickyContainer,
    NavbarStartSlotContainer,
    NavbarCenterSlotContainer,
    NavbarEndSlotContainer,
    NavPositionStart: NavPositionStart,
    NavPositionCenter: NavPositionCenter,
    NavPositionEnd: NavPositionEnd,
    Background: BackgroundContainer,
    Shadow: ShadowContainer,
    TextColor: TextColorContainer,
}; 
