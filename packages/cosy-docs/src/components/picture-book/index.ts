import PictureBookPageBackgroundContainer from "./page/PictureBookPageBackgroundContainer.astro";
import PictureBookPageBasic from "./page/PictureBookPageBasic.astro";
import PictureBookPageBorderContainer from "./page/PictureBookPageBorderContainer.astro";
import PictureBookPageRatioContainer from "./page/PictureBookPageRatioContainer.astro";
import PictureBookPageRoundedContainer from "./page/PictureBookPageRoundedContainer.astro";
import SlotBackgroundContainer from "./slots/BackgroundContainer.astro";
import SlotDefaultContainer from "./slots/DefaultContainer.astro";
import SlotOverlayContainer from "./slots/OverlayContainer.astro";
import TextBoxBackdropBlurContainer from "./textbox/TextBoxBackdropBlurContainer.astro";
import TextBoxBasic from "./textbox/TextBoxBasic.astro";
import TextBoxBgContainer from "./textbox/TextBoxBgContainer.astro";
import TextBoxBottomContainer from "./textbox/TextBoxBottomContainer.astro";
import TextBoxFontScaleContainer from "./textbox/TextBoxFontScaleContainer.astro";
import TextBoxHeightContainer from "./textbox/TextBoxHeightContainer.astro";
import TextBoxHeightPercentContainer from "./textbox/TextBoxHeightPercentContainer.astro";
import TextBoxLeftContainer from "./textbox/TextBoxLeftContainer.astro";
import TextBoxPaddingCqwContainer from "./textbox/TextBoxPaddingCqwContainer.astro";
import TextBoxRightContainer from "./textbox/TextBoxRightContainer.astro";
import TextBoxRoundedCqwContainer from "./textbox/TextBoxRoundedCqwContainer.astro";
import TextBoxRoundPadContainer from "./textbox/TextBoxRoundPadContainer.astro";
import TextBoxTopContainer from "./textbox/TextBoxTopContainer.astro";
import TextBoxWidthContainer from "./textbox/TextBoxWidthContainer.astro";
import TextBoxZIndexContainer from "./textbox/TextBoxZIndexContainer.astro";

export const PictureBookPackage = {
	PageExamples: {
		Basic: PictureBookPageBasic,
	},
	PageContainers: {
		Background: PictureBookPageBackgroundContainer,
		Border: PictureBookPageBorderContainer,
		PageAspectRatio: PictureBookPageRatioContainer,
		Rounded: PictureBookPageRoundedContainer,
	},
	TextBoxExamples: {
		Basic: TextBoxBasic,
	},
	TextBoxContainers: {
		BgAndBlur: TextBoxBgContainer,
		BackdropBlur: TextBoxBackdropBlurContainer,
		RoundedAndPadding: TextBoxRoundPadContainer,

		ZIndex: TextBoxZIndexContainer,
		Bottom: TextBoxBottomContainer,
		Left: TextBoxLeftContainer,
		Right: TextBoxRightContainer,
		Top: TextBoxTopContainer,
		Width: TextBoxWidthContainer,
		Height: TextBoxHeightContainer,
		HeightPercent: TextBoxHeightPercentContainer,
		PaddingCqw: TextBoxPaddingCqwContainer,
		RoundedCqw: TextBoxRoundedCqwContainer,
		FontScale: TextBoxFontScaleContainer,
	},
	SlotContainers: {
		Background: SlotBackgroundContainer,
		Overlay: SlotOverlayContainer,
		Default: SlotDefaultContainer,
	},
};
