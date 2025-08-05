import BannerBasicContainer from './BannerBasicContainer.astro';
import BannerPrimaryContainer from './BannerPrimaryContainer.astro';
import BannerSecondaryContainer from './BannerSecondaryContainer.astro';
import BannerSuccessContainer from './BannerSuccessContainer.astro';
import BannerWarningContainer from './BannerWarningContainer.astro';
import BannerDangerContainer from './BannerDangerContainer.astro';
import BannerInfoContainer from './BannerInfoContainer.astro';
import BannerCustomStyleContainer from './BannerCustomStyleContainer.astro';
import BannerColorsContainer from './BannerColorsContainer.astro';
import BannerAnimationsContainer from './BannerAnimationsContainer.astro';

export const BannerPackage = {
    Animations: BannerAnimationsContainer,
    Basic: BannerBasicContainer,
    Colors: BannerColorsContainer,
    CustomStyle: BannerCustomStyleContainer,
    Danger: BannerDangerContainer,
    Info: BannerInfoContainer,
    Primary: BannerPrimaryContainer,
    Secondary: BannerSecondaryContainer,
    Success: BannerSuccessContainer,
    Warning: BannerWarningContainer,
}; 
