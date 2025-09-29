import ImageRowContainer from "./ImageRowContainer.astro";
import ImageRowStyles from "./ImageRowStyles.astro";
import ImageRowCase from "./ImageRowCase.astro";
import ImageRowImagesContainer from "./ImageRowImagesContainer.astro";
import ImageRowGapContainer from "./ImageRowGapContainer.astro";
import ImageRowRoundedContainer from "./ImageRowRoundedContainer.astro";
import ImageRowContainerRoundedContainer from "./ImageRowContainerRoundedContainer.astro";
import ImageRowNavigationContainer from "./ImageRowNavigationContainer.astro";
import ImageRowShadowContainer from "./ImageRowShadowContainer.astro";
import ImageRowHoverContainer from "./ImageRowHoverContainer.astro";
import ImageRowBackgroundContainer from "./ImageRowBackgroundContainer.astro";
import ImageRowBorderContainer from "./ImageRowBorderContainer.astro";
import ImageRowMarginContainer from "./ImageRowMarginContainer.astro";
import ImageRowPaddingContainer from "./ImageRowPaddingContainer.astro";
import ImageRowWidthContainer from "./ImageRowWidthContainer.astro";
import ImageRowHeightContainer from "./ImageRowHeightContainer.astro";

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
