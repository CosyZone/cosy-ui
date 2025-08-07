
import ImageBasicContainer from './ImageBasicContainer.astro';
import ImageRoundedShadowContainer from './ImageRoundedShadowContainer.astro';
import ImageHoverContainer from './ImageHoverContainer.astro';
import ImageLoadingIndicatorSpinnerContainer from './ImageLoadingIndicatorSpinnerContainer.astro';
import ImageLoadingIndicatorProgressContainer from './ImageLoadingIndicatorProgressContainer.astro';
import ImageObjectFitContainer from './ImageObjectFitContainer.astro';
import ImageTransitionContainer from './ImageTransitionContainer.astro';

export const ComponentPackage = {
    Basic: ImageBasicContainer,
    RoundedShadow: ImageRoundedShadowContainer,
    Hover: ImageHoverContainer,
    LoadingIndicatorSpinner: ImageLoadingIndicatorSpinnerContainer,
    LoadingIndicatorProgress: ImageLoadingIndicatorProgressContainer,
    ObjectFit: ImageObjectFitContainer,
    Transition: ImageTransitionContainer,
}; 
