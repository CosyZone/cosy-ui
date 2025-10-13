import ContainerVueBackgroundContainer from "./ContainerVueBackgroundContainer.astro";
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
import ContainerVueSlotsContainer from "./ContainerVueSlotsContainer.astro";
import ContainerVueAspectRatioContainer from "./ContainerVueAspectRatioContainer.astro";
import ContainerVueHeightContainer from "./ContainerVueHeightContainer.astro";
import ContainerVueSizeContainer from "./ContainerVueSizeContainer.astro";
import ContainerVueMutedTestContainer from "./ContainerVueMutedTestContainer.astro";

export const ContainerVuePackage = {
	Basic: ContainerVueBasicContainer,
	AspectRatio: ContainerVueAspectRatioContainer,
	Background: ContainerVueBackgroundContainer,
	Border: ContainerVueBorderContainer,
	Centered: ContainerVueCenteredContainer,
	CustomClass: ContainerVueCustomClassContainer,
	Flex: ContainerVueFlexContainer,
	Gap: ContainerVueGapContainer,
	Height: ContainerVueHeightContainer,
	Items: ContainerVueItemsContainer,
	Justify: ContainerVueJustifyContainer,
	Padding: ContainerVuePaddingContainer,
	Rounded: ContainerVueRoundedContainer,
	Size: ContainerVueSizeContainer,
	Slots: ContainerVueSlotsContainer,
	MutedTest: ContainerVueMutedTestContainer,
};
