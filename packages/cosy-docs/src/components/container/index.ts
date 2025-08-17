

import ContainerBackgroundContainer from './ContainerBackgroundContainer.astro';
import ContainerBasicContainer from './ContainerBasicContainer.astro';
import ContainerBorderContainer from './ContainerBorderContainer.astro';
import ContainerCenteredContainer from './ContainerCenteredContainer.astro';
import ContainerClassListContainer from './ContainerClassListContainer.astro';
import ContainerCustomClassContainer from './ContainerCustomClassContainer.astro';
import ContainerFlexContainer from './ContainerFlexContainer.astro';
import ContainerGapContainer from './ContainerGapContainer.astro';
import ContainerItemsContainer from './ContainerItemsContainer.astro';
import ContainerJustifyContainer from './ContainerJustifyContainer.astro';
import ContainerMarginContainer from './ContainerMarginContainer.astro';
import ContainerPaddingContainer from './ContainerPaddingContainer.astro';
import ContainerRoundedContainer from './ContainerRoundedContainer.astro';
import ContainerSizesContainer from './ContainerSizesContainer.astro';

export const ContainerPackage = {
    Background: ContainerBackgroundContainer,
    Basic: ContainerBasicContainer,
    Border: ContainerBorderContainer,
    Centered: ContainerCenteredContainer,
    ClassList: ContainerClassListContainer,
    CustomClass: ContainerCustomClassContainer,
    Flex: ContainerFlexContainer,
    Gap: ContainerGapContainer,
    Items: ContainerItemsContainer,
    Justify: ContainerJustifyContainer,
    Margin: ContainerMarginContainer,
    Padding: ContainerPaddingContainer,
    Rounded: ContainerRoundedContainer,
    Sizes: ContainerSizesContainer,
}; 
