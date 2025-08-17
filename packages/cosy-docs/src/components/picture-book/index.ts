import PictureBookPageBasic from './page/PictureBookPageBasic.astro';
import PictureBookPageRatioContainer from './page/PictureBookPageRatioContainer.astro';
import PictureBookPageBackgroundContainer from './page/PictureBookPageBackgroundContainer.astro';

import TextBoxBasic from './textbox/TextBoxBasic.astro';
import TextBoxBottomContainer from './textbox/TextBoxBottomContainer.astro';
import TextBoxLeftContainer from './textbox/TextBoxLeftContainer.astro';
import TextBoxRightContainer from './textbox/TextBoxRightContainer.astro';
import TextBoxTopContainer from './textbox/TextBoxTopContainer.astro';
import TextBoxWidthContainer from './textbox/TextBoxWidthContainer.astro';
import TextBoxBgContainer from './textbox/TextBoxBgContainer.astro';
import TextBoxBackdropBlurContainer from './textbox/TextBoxBackdropBlurContainer.astro';
import TextBoxRoundPadContainer from './textbox/TextBoxRoundPadContainer.astro';
import TextBoxShadowContainer from './textbox/TextBoxShadowContainer.astro';
import TextBoxZIndexContainer from './textbox/TextBoxZIndexContainer.astro';
import SlotBackgroundContainer from './slots/BackgroundContainer.astro';
import SlotOverlayContainer from './slots/OverlayContainer.astro';
import SlotDefaultContainer from './slots/DefaultContainer.astro';

export const PictureBookPackage = {
    PageExamples: {
        Basic: PictureBookPageBasic,
    },
    PageContainers: {
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
        TextShadow: TextBoxShadowContainer,
        ZIndex: TextBoxZIndexContainer,
        Bottom: TextBoxBottomContainer,
        Left: TextBoxLeftContainer,
        Right: TextBoxRightContainer,
        Top: TextBoxTopContainer,
        Width: TextBoxWidthContainer,
    },
    SlotContainers: {
        Background: SlotBackgroundContainer,
        Overlay: SlotOverlayContainer,
        Default: SlotDefaultContainer,
    },
};


