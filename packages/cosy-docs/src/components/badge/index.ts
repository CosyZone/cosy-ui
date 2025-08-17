import BadgeBasicContainer from './BadgeBasicContainer.astro';
import BadgeClassContainer from './BadgeClassContainer.astro';
import BadgeVariantContainer from './BadgeVariantContainer.astro';
import OutlineContainer from './OutlineContainer.astro';
import SizesContainer from './SizesContainer.astro';

export const BadgePackage = {
    Basic: BadgeBasicContainer,
    Class: BadgeClassContainer,
    Outline: OutlineContainer,
    Sizes: SizesContainer,
    Variant: BadgeVariantContainer,
}; 
