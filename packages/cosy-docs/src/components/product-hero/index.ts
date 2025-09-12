import ProductHeroExampleContainer from './ProductHeroExampleContainer.astro';
import ProductHeroNameContainer from './ProductHeroNameContainer.astro';
import ProductHeroDescriptionContainer from './ProductHeroDescriptionContainer.astro';
import ProductHeroImageContainer from './ProductHeroImageContainer.astro';
import ProductHeroHighlightContainer from './ProductHeroHighlightContainer.astro';
import ProductHeroAlignContainer from './ProductHeroAlignContainer.astro';
import ProductHeroBackgroundContainer from './ProductHeroBackgroundContainer.astro';
import ProductHeroClassContainer from './ProductHeroClassContainer.astro';
import ProductHeroLabelsContainer from './ProductHeroLabelsContainer.astro';

export const ProductHeroPackage = {
    Example: ProductHeroExampleContainer,
    Name: ProductHeroNameContainer,
    Description: ProductHeroDescriptionContainer,
    Image: ProductHeroImageContainer,
    Highlight: ProductHeroHighlightContainer,
    Align: ProductHeroAlignContainer,
    Background: ProductHeroBackgroundContainer,
    Labels: ProductHeroLabelsContainer,
    Class: ProductHeroClassContainer,
};
