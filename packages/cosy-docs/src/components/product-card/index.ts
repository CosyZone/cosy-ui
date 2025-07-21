import ProductCardBasic from './ProductCardBasic.astro';
import ProductCardBasicContainer from './ProductCardBasicContainer.astro';
import ProductCardSizes from './ProductCardSizes.astro';
import ProductCardSizesContainer from './ProductCardSizesContainer.astro';
import ProductCardShadow from './ProductCardShadow.astro';
import ProductCardShadowContainer from './ProductCardShadowContainer.astro';
import ProductCardEqualHeight from './ProductCardEqualHeight.astro';
import ProductCardEqualHeightContainer from './ProductCardEqualHeightContainer.astro';
import ProductCardDescriptionLines from './ProductCardDescriptionLines.astro';
import ProductCardDescriptionLinesContainer from './ProductCardDescriptionLinesContainer.astro';

export const ProductCardPackage = {
    ComponentContainers: {
        Basic: ProductCardBasicContainer,
        Sizes: ProductCardSizesContainer,
        Shadow: ProductCardShadowContainer,
        EqualHeight: ProductCardEqualHeightContainer,
        DescriptionLines: ProductCardDescriptionLinesContainer,
    },
    ComponentExamples: {
        Basic: ProductCardBasic,
        Sizes: ProductCardSizes,
        Shadow: ProductCardShadow,
        EqualHeight: ProductCardEqualHeight,
        DescriptionLines: ProductCardDescriptionLines,
    },
}; 
