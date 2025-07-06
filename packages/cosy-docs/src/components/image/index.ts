import ImageBasic from './ImageBasic.astro';
import ImageRoundedShadow from './ImageRoundedShadow.astro';
import ImageHover from './ImageHover.astro';
import ImageLoadingIndicatorSpinner from './ImageLoadingIndicatorSpinner.astro';
import ImageLoadingIndicatorProgress from './ImageLoadingIndicatorProgress.astro';
import ImageObjectFit from './ImageObjectFit.astro';
import ImageTransition from './ImageTransition.astro';

import ImageBasicContainer from './ImageBasicContainer.astro';
import ImageRoundedShadowContainer from './ImageRoundedShadowContainer.astro';
import ImageHoverContainer from './ImageHoverContainer.astro';
import ImageLoadingIndicatorSpinnerContainer from './ImageLoadingIndicatorSpinnerContainer.astro';
import ImageLoadingIndicatorProgressContainer from './ImageLoadingIndicatorProgressContainer.astro';
import ImageObjectFitContainer from './ImageObjectFitContainer.astro';
import ImageTransitionContainer from './ImageTransitionContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: ImageBasicContainer,
        RoundedShadow: ImageRoundedShadowContainer,
        Hover: ImageHoverContainer,
        LoadingIndicatorSpinner: ImageLoadingIndicatorSpinnerContainer,
        LoadingIndicatorProgress: ImageLoadingIndicatorProgressContainer,
        ObjectFit: ImageObjectFitContainer,
        Transition: ImageTransitionContainer,
    },
    Examples: {
        Basic: ImageBasic,
        RoundedShadow: ImageRoundedShadow,
        Hover: ImageHover,
        LoadingIndicatorSpinner: ImageLoadingIndicatorSpinner,
        LoadingIndicatorProgress: ImageLoadingIndicatorProgress,
        ObjectFit: ImageObjectFit,
        Transition: ImageTransition,
    },
}; 
