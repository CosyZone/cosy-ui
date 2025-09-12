import ImagesContainer from './ImagesContainer.astro';
import ImagesBasic from './ImagesBasic.astro';
import ImagesLayouts from './ImagesLayouts.astro';
import ImagesStyles from './ImagesStyles.astro';
import ImagesGrid from './ImagesGrid.astro';
import ImagesMasonry from './ImagesMasonry.astro';
import ImagesCarousel from './ImagesCarousel.astro';
import ImagesStack from './ImagesStack.astro';
import ImagesRounded from './ImagesRounded.astro';
import ImagesShadow from './ImagesShadow.astro';
import ImagesHover from './ImagesHover.astro';
import ImagesGap from './ImagesGap.astro';
import ImagesCase from './ImagesCase.astro';
import ImagesImagesContainer from './ImagesImagesContainer.astro';
import ImagesColumnsContainer from './ImagesColumnsContainer.astro';
import ImagesGapContainer from './ImagesGapContainer.astro';
import ImagesRoundedContainer from './ImagesRoundedContainer.astro';
import ImagesShadowContainer from './ImagesShadowContainer.astro';
import ImagesHoverContainer from './ImagesHoverContainer.astro';

export const ImagesPackage = {
    Basic: ImagesContainer,
    Case: ImagesCase,
    Images: ImagesImagesContainer,
    Columns: ImagesColumnsContainer,
    Gap: ImagesGapContainer,
    Rounded: ImagesRoundedContainer,
    Shadow: ImagesShadowContainer,
    Hover: ImagesHoverContainer,
    Layouts: ImagesLayouts,
    Styles: ImagesStyles,
    Grid: ImagesGrid,
    Masonry: ImagesMasonry,
    Carousel: ImagesCarousel,
    Stack: ImagesStack,
};
