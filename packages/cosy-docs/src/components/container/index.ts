import ContainerAspectRatioContainer from "./ContainerAspectRatioContainer.astro";
import ContainerBackgroundContainer from "./ContainerBackgroundContainer.astro";
import ContainerBackgroundImageContainer from "./ContainerBackgroundImageContainer.astro";
import ContainerBasicContainer from "./ContainerBasicContainer.astro";
import ContainerBorderContainer from "./ContainerBorderContainer.astro";
import ContainerBorderColorContainer from "./ContainerBorderColorContainer.astro";
import ContainerCenteredContainer from "./ContainerCenteredContainer.astro";
import ContainerClassListContainer from "./ContainerClassListContainer.astro";
import ContainerCustomClassContainer from "./ContainerCustomClassContainer.astro";
import ContainerFlexContainer from "./ContainerFlexContainer.astro";
import ContainerGapContainer from "./ContainerGapContainer.astro";
import ContainerHeightContainer from "./ContainerHeightContainer.astro";
import ContainerItemsContainer from "./ContainerItemsContainer.astro";
import ContainerJustifyContainer from "./ContainerJustifyContainer.astro";
import ContainerMarginContainer from "./ContainerMarginContainer.astro";
import ContainerPaddingContainer from "./ContainerPaddingContainer.astro";
import ContainerRoundedContainer from "./ContainerRoundedContainer.astro";
import ContainerWidthsContainer from "./ContainerWidthsContainer.astro";
import ContainerFitContainer from "./ContainerFitContainer.astro";
import ContainerSlotContainer from "./ContainerSlotContainer.astro";
import ContainerPaddingAxisContainer from "./ContainerPaddingAxisContainer.astro";
import ContainerPaddingTopContainer from "./ContainerPaddingTopContainer.astro";
import ContainerPaddingBottomContainer from "./ContainerPaddingBottomContainer.astro";
import ContainerPaddingXContainer from "./ContainerPaddingXContainer.astro";
import ContainerPaddingLeftContainer from "./ContainerPaddingLeftContainer.astro";
import ContainerPaddingRightContainer from "./ContainerPaddingRightContainer.astro";

export const ContainerPackage = {
	Examples: {
		Basic: ContainerBasicContainer,
	},
	Containers: {
		AspectRatio: ContainerAspectRatioContainer,
		Background: ContainerBackgroundContainer,
		BackgroundImage: ContainerBackgroundImageContainer,
		Border: ContainerBorderContainer,
		BorderColor: ContainerBorderColorContainer,
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
		PaddingAxis: ContainerPaddingAxisContainer,
		PaddingTop: ContainerPaddingTopContainer,
		PaddingBottom: ContainerPaddingBottomContainer,
		PaddingX: ContainerPaddingXContainer,
		PaddingLeft: ContainerPaddingLeftContainer,
		PaddingRight: ContainerPaddingRightContainer,
		Rounded: ContainerRoundedContainer,
		Widths: ContainerWidthsContainer,
		Fit: ContainerFitContainer,
		Slot: ContainerSlotContainer,
	},
};
