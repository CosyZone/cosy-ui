import PictureBookPageBasic from './page/PictureBookPageBasic.astro';
import PictureBookPageRatioContainer from './page/PictureBookPageRatioContainer.astro';
import PictureBookPageBackgroundContainer from './page/PictureBookPageBackgroundContainer.astro';
import PictureBookPageFillParentContainer from './page/PictureBookPageFillParentContainer.astro';

import TextBoxBasic from './textbox/TextBoxBasic.astro';
import TextBoxBottomContainer from './textbox/TextBoxBottomContainer.astro';
import TextBoxLeftContainer from './textbox/TextBoxLeftContainer.astro';
import TextBoxRightContainer from './textbox/TextBoxRightContainer.astro';
import TextBoxTopContainer from './textbox/TextBoxTopContainer.astro';
import TextBoxWidthContainer from './textbox/TextBoxWidthContainer.astro';
import TextBoxBgContainer from './textbox/TextBoxBgContainer.astro';
import TextBoxBackdropBlurContainer from './textbox/TextBoxBackdropBlurContainer.astro';
import TextBoxRoundPadContainer from './textbox/TextBoxRoundPadContainer.astro';
import TextBoxZIndexContainer from './textbox/TextBoxZIndexContainer.astro';
import TextBoxHeightContainer from './textbox/TextBoxHeightContainer.astro';
import TextBoxHeightPercentContainer from './textbox/TextBoxHeightPercentContainer.astro';
import TextBoxPaddingCqwContainer from './textbox/TextBoxPaddingCqwContainer.astro';
import TextBoxRoundedCqwContainer from './textbox/TextBoxRoundedCqwContainer.astro';
import TextBoxFontScaleContainer from './textbox/TextBoxFontScaleContainer.astro';
import SlotBackgroundContainer from './slots/BackgroundContainer.astro';
import SlotOverlayContainer from './slots/OverlayContainer.astro';
import SlotDefaultContainer from './slots/DefaultContainer.astro';

export const PictureBookPackage = {
    PageExamples: {
        Basic: PictureBookPageBasic,
    },
    PageContainers: {
        FillParent: PictureBookPageFillParentContainer,
        PageAspectRatio: PictureBookPageRatioContainer,
        Background: PictureBookPageBackgroundContainer,
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


