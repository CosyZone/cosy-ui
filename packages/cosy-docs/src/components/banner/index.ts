import BannerBasic from './BannerBasic.astro';
import BannerBasicContainer from './BannerBasicContainer.astro';
import BannerPrimary from './BannerPrimary.astro';
import BannerPrimaryContainer from './BannerPrimaryContainer.astro';
import BannerSecondary from './BannerSecondary.astro';
import BannerSecondaryContainer from './BannerSecondaryContainer.astro';
import BannerSuccess from './BannerSuccess.astro';
import BannerSuccessContainer from './BannerSuccessContainer.astro';
import BannerWarning from './BannerWarning.astro';
import BannerWarningContainer from './BannerWarningContainer.astro';
import BannerDanger from './BannerDanger.astro';
import BannerDangerContainer from './BannerDangerContainer.astro';
import BannerInfo from './BannerInfo.astro';
import BannerInfoContainer from './BannerInfoContainer.astro';
import BannerCustomStyle from './BannerCustomStyle.astro';
import BannerCustomStyleContainer from './BannerCustomStyleContainer.astro';
import BannerColorsContainer from './BannerColorsContainer.astro';
import BannerAnimationsContainer from './BannerAnimationsContainer.astro';
import BannerAllAnimationsNone from './BannerAllAnimationsNone.astro';
import BannerAllAnimationsFade from './BannerAllAnimationsFade.astro';
import BannerAllAnimationsSlide from './BannerAllAnimationsSlide.astro';
import BannerAllAnimationsBoth from './BannerAllAnimationsBoth.astro';

export const BannerPackage = {
    BannerContainers: {
        Basic: BannerBasicContainer,
        Primary: BannerPrimaryContainer,
        Secondary: BannerSecondaryContainer,
        Success: BannerSuccessContainer,
        Warning: BannerWarningContainer,
        Danger: BannerDangerContainer,
        Info: BannerInfoContainer,
        CustomStyle: BannerCustomStyleContainer,
        Colors: BannerColorsContainer,
        Animations: BannerAnimationsContainer,
    },
    BannerExamples: {
        Basic: BannerBasic,
        Primary: BannerPrimary,
        Secondary: BannerSecondary,
        Success: BannerSuccess,
        Warning: BannerWarning,
        Danger: BannerDanger,
        Info: BannerInfo,
        CustomStyle: BannerCustomStyle,
        AllAnimationsNone: BannerAllAnimationsNone,
        AllAnimationsFade: BannerAllAnimationsFade,
        AllAnimationsSlide: BannerAllAnimationsSlide,
        AllAnimationsBoth: BannerAllAnimationsBoth,
    },
}; 
