
import ContainerBasic from './ContainerBasic.astro';
import ContainerSizes from './ContainerSizes.astro';
import ContainerPadding from './ContainerPadding.astro';
import ContainerMargin from './ContainerMargin.astro';
import ContainerFlex from './ContainerFlex.astro';

import ContainerBasicContainer from './ContainerBasicContainer.astro';
import ContainerSizesContainer from './ContainerSizesContainer.astro';
import ContainerPaddingContainer from './ContainerPaddingContainer.astro';
import ContainerMarginContainer from './ContainerMarginContainer.astro';
import ContainerFlexContainer from './ContainerFlexContainer.astro';

export const ContainerPackage = {
    ComponentContainers: {
        Basic: ContainerBasicContainer,
        Sizes: ContainerSizesContainer,
        Padding: ContainerPaddingContainer,
        Margin: ContainerMarginContainer,
        Flex: ContainerFlexContainer,
    },
    Examples: {
        Basic: ContainerBasic,
        Sizes: ContainerSizes,
        Padding: ContainerPadding,
        Margin: ContainerMargin,
        Flex: ContainerFlex,
    },
}; 
