import ImageRowBackgroundContainer from "./ImageRowBackgroundContainer.astro";
import ImageRowBorderContainer from "./ImageRowBorderContainer.astro";
import ImageRowCase from "./ImageRowCase.astro";
import ImageRowContainer from "./ImageRowContainer.astro";
import ImageRowContainerRoundedContainer from "./ImageRowContainerRoundedContainer.astro";
import ImageRowGapContainer from "./ImageRowGapContainer.astro";
import ImageRowHeightContainer from "./ImageRowHeightContainer.astro";
import ImageRowHoverContainer from "./ImageRowHoverContainer.astro";
import ImageRowImagesContainer from "./ImageRowImagesContainer.astro";
import ImageRowMarginContainer from "./ImageRowMarginContainer.astro";
import ImageRowNavigationContainer from "./ImageRowNavigationContainer.astro";
import ImageRowPaddingContainer from "./ImageRowPaddingContainer.astro";
import ImageRowRoundedContainer from "./ImageRowRoundedContainer.astro";
import ImageRowShadowContainer from "./ImageRowShadowContainer.astro";
import ImageRowStyles from "./ImageRowStyles.astro";
import ImageRowWidthContainer from "./ImageRowWidthContainer.astro";

export const ImageRowPackage = {
	Basic: ImageRowContainer,
	Case: ImageRowCase,
	Images: ImageRowImagesContainer,
	Gap: ImageRowGapContainer,
	Rounded: ImageRowRoundedContainer,
	ContainerRounded: ImageRowContainerRoundedContainer,
	Navigation: ImageRowNavigationContainer,
	Shadow: ImageRowShadowContainer,
	Hover: ImageRowHoverContainer,
	Styles: ImageRowStyles,
	Background: ImageRowBackgroundContainer,
	Border: ImageRowBorderContainer,
	Margin: ImageRowMarginContainer,
	Padding: ImageRowPaddingContainer,
	Width: ImageRowWidthContainer,
	Height: ImageRowHeightContainer,
};
