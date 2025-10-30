import ProductHeroActionsContainer from "./ProductHeroActionsContainer.astro";
import ProductHeroAlignContainer from "./ProductHeroAlignContainer.astro";
import ProductHeroBackgroundContainer from "./ProductHeroBackgroundContainer.astro";
import ProductHeroClassContainer from "./ProductHeroClassContainer.astro";
import ProductHeroDescriptionContainer from "./ProductHeroDescriptionContainer.astro";
import ProductHeroExampleContainer from "./ProductHeroExampleContainer.astro";
import ProductHeroHighlightContainer from "./ProductHeroHighlightContainer.astro";
import ProductHeroImageContainer from "./ProductHeroImageContainer.astro";
import ProductHeroLabelsContainer from "./ProductHeroLabelsContainer.astro";
import ProductHeroNameContainer from "./ProductHeroNameContainer.astro";

export const ProductHeroPackage = {
	Example: ProductHeroExampleContainer,
	Name: ProductHeroNameContainer,
	Description: ProductHeroDescriptionContainer,
	Image: ProductHeroImageContainer,
	Highlight: ProductHeroHighlightContainer,
	Align: ProductHeroAlignContainer,
	Background: ProductHeroBackgroundContainer,
	Labels: ProductHeroLabelsContainer,
	Actions: ProductHeroActionsContainer,
	Class: ProductHeroClassContainer,
};
