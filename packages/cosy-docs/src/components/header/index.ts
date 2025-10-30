import BackgroundContainer from "./BackgroundContainer.astro";
import Basic from "./Basic.astro";
import HeightContainer from "./HeightContainer.astro";
import NavbarCenterSlotContainer from "./NavbarCenterSlotContainer.astro";
import NavbarEndSlotContainer from "./NavbarEndSlotContainer.astro";
import NavbarStartSlotContainer from "./NavbarStartSlotContainer.astro";
import NavPositionCenter from "./NavPositionCenter.astro";
import NavPositionContainer from "./NavPositionContainer.astro";
import NavPositionEnd from "./NavPositionEnd.astro";
import NavPositionStart from "./NavPositionStart.astro";
import ShadowContainer from "./ShadowContainer.astro";
import StickyContainer from "./StickyContainer.astro";
import TextColorContainer from "./TextColorContainer.astro";

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
