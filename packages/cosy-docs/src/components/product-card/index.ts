import EProductCardBasic from './EProductCardBasic.astro';
import EProductCardBasicContainer from './EProductCardBasicContainer.astro';
import EProductCardSizes from './EProductCardSizes.astro';
import EProductCardSizesContainer from './EProductCardSizesContainer.astro';
import EProductCardShadow from './EProductCardShadow.astro';
import EProductCardShadowContainer from './EProductCardShadowContainer.astro';
import EProductCardEqualHeight from './EProductCardEqualHeight.astro';
import EProductCardEqualHeightContainer from './EProductCardEqualHeightContainer.astro';
import EProductCardDescriptionLines from './EProductCardDescriptionLines.astro';
import EProductCardDescriptionLinesContainer from './EProductCardDescriptionLinesContainer.astro';

export const ProductCardPackage = {
    ComponentContainers: {
        Basic: EProductCardBasicContainer,
        Sizes: EProductCardSizesContainer,
        Shadow: EProductCardShadowContainer,
        EqualHeight: EProductCardEqualHeightContainer,
        DescriptionLines: EProductCardDescriptionLinesContainer,
    },
    ComponentExamples: {
        Basic: EProductCardBasic,
        Sizes: EProductCardSizes,
        Shadow: EProductCardShadow,
        EqualHeight: EProductCardEqualHeight,
        DescriptionLines: EProductCardDescriptionLines,
    },
}; 
