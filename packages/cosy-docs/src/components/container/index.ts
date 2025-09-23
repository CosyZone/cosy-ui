

import ContainerAspectRatioContainer from './ContainerAspectRatioContainer.astro';
import ContainerBackgroundContainer from './ContainerBackgroundContainer.astro';
import ContainerBackgroundImageContainer from './ContainerBackgroundImageContainer.astro';
import ContainerBasic from './ContainerBasic.astro';
import ContainerBorderContainer from './ContainerBorderContainer.astro';
import ContainerCenteredContainer from './ContainerCenteredContainer.astro';
import ContainerClassListContainer from './ContainerClassListContainer.astro';
import ContainerCustomClassContainer from './ContainerCustomClassContainer.astro';
import ContainerFlexContainer from './ContainerFlexContainer.astro';
import ContainerGapContainer from './ContainerGapContainer.astro';
import ContainerHeightContainer from './ContainerHeightContainer.astro';
import ContainerItemsContainer from './ContainerItemsContainer.astro';
import ContainerJustifyContainer from './ContainerJustifyContainer.astro';
import ContainerMarginContainer from './ContainerMarginContainer.astro';
import ContainerPaddingContainer from './ContainerPaddingContainer.astro';
import ContainerRoundedContainer from './ContainerRoundedContainer.astro';
import ContainerWidthsContainer from './ContainerWidthsContainer.astro';
import ContainerFitContainer from './ContainerFitContainer.astro';
import ContainerContentBorderContainer from './ContainerContentBorderContainer.astro';
import ContainerSlotContainer from './ContainerSlotContainer.astro';

export const ContainerPackage = {
    Examples: {
        Basic: ContainerBasic,
    },
    Containers: {
        AspectRatio: ContainerAspectRatioContainer,
        Background: ContainerBackgroundContainer,
        BackgroundImage: ContainerBackgroundImageContainer,
        Border: ContainerBorderContainer,
        Centered: ContainerCenteredContainer,
        ClassList: ContainerClassListContainer,
        CustomClass: ContainerCustomClassContainer,
        Flex: ContainerFlexContainer,
        Gap: ContainerGapContainer,
        Height: ContainerHeightContainer,
        Items: ContainerItemsContainer,
        Justify: ContainerJustifyContainer,
        Margin: ContainerMarginContainer,
        Padding: ContainerPaddingContainer,
        Rounded: ContainerRoundedContainer,
        Widths: ContainerWidthsContainer,
        Fit: ContainerFitContainer,
        ContentBorder: ContainerContentBorderContainer,
        Slot: ContainerSlotContainer,
    },
}; 
