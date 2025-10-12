import ContainerVueBackgroundContainer from "./ContainerVueBackgroundContainer.astro";
import ContainerVueBackgroundOpacityContainer from "./ContainerVueBackgroundOpacityContainer.astro";
import ContainerVueBasicContainer from "./ContainerVueBasicContainer.astro";
import ContainerVueBorderContainer from "./ContainerVueBorderContainer.astro";
import ContainerVueCenteredContainer from "./ContainerVueCenteredContainer.astro";
import ContainerVueCustomClassContainer from "./ContainerVueCustomClassContainer.astro";
import ContainerVueFlexContainer from "./ContainerVueFlexContainer.astro";
import ContainerVueGapContainer from "./ContainerVueGapContainer.astro";
import ContainerVueItemsContainer from "./ContainerVueItemsContainer.astro";
import ContainerVueJustifyContainer from "./ContainerVueJustifyContainer.astro";
import ContainerVuePaddingContainer from "./ContainerVuePaddingContainer.astro";
import ContainerVueRoundedContainer from "./ContainerVueRoundedContainer.astro";
import ContainerVueSizesContainer from "./ContainerVueSizesContainer.astro";
import ContainerVueSlotsContainer from "./ContainerVueSlotsContainer.astro";
import ContainerVueAspectRatioContainer from "./ContainerVueAspectRatioContainer.astro";
import ContainerVueHeightContainer from "./ContainerVueHeightContainer.astro";
import ContainerVueSizeContainer from "./ContainerVueSizeContainer.astro";
import ContainerVueConflictContainer from "./ContainerVueConflictContainer.astro";

export const ContainerVuePackage = {
	AspectRatio: ContainerVueAspectRatioContainer,
	Background: ContainerVueBackgroundContainer,
	BackgroundOpacity: ContainerVueBackgroundOpacityContainer,
	Basic: ContainerVueBasicContainer,
	Border: ContainerVueBorderContainer,
	Centered: ContainerVueCenteredContainer,
	Conflict: ContainerVueConflictContainer,
	CustomClass: ContainerVueCustomClassContainer,
	Flex: ContainerVueFlexContainer,
	Gap: ContainerVueGapContainer,
	Height: ContainerVueHeightContainer,
	Items: ContainerVueItemsContainer,
	Justify: ContainerVueJustifyContainer,
	Padding: ContainerVuePaddingContainer,
	Rounded: ContainerVueRoundedContainer,
	Size: ContainerVueSizeContainer,
	Sizes: ContainerVueSizesContainer,
	Slots: ContainerVueSlotsContainer,
};