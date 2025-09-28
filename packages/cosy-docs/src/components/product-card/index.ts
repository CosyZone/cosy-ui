import ProductCardBasic from "./ProductCardBasic.astro";
import ProductCardBasicContainer from "./ProductCardBasicContainer.astro";
import ProductCardSizes from "./ProductCardSizes.astro";
import ProductCardSizesContainer from "./ProductCardSizesContainer.astro";
import ProductCardShadow from "./ProductCardShadow.astro";
import ProductCardShadowContainer from "./ProductCardShadowContainer.astro";
import ProductCardEqualHeight from "./ProductCardEqualHeight.astro";
import ProductCardEqualHeightContainer from "./ProductCardEqualHeightContainer.astro";
import ProductCardDescriptionLines from "./ProductCardDescriptionLines.astro";
import ProductCardDescriptionLinesContainer from "./ProductCardDescriptionLinesContainer.astro";

// 新增的容器组件
import ProductCardAppStoreUrl from "./ProductCardAppStoreUrl.astro";
import ProductCardAppStoreUrlContainer from "./ProductCardAppStoreUrlContainer.astro";
import ProductCardButtonLayout from "./ProductCardButtonLayout.astro";
import ProductCardButtonLayoutContainer from "./ProductCardButtonLayoutContainer.astro";
import ProductCardClass from "./ProductCardClass.astro";
import ProductCardClassContainer from "./ProductCardClassContainer.astro";
import ProductCardDescription from "./ProductCardDescription.astro";
import ProductCardDescriptionContainer from "./ProductCardDescriptionContainer.astro";
import ProductCardGithubButtonText from "./ProductCardGithubButtonText.astro";
import ProductCardGithubButtonTextContainer from "./ProductCardGithubButtonTextContainer.astro";
import ProductCardGithubUrl from "./ProductCardGithubUrl.astro";
import ProductCardGithubUrlContainer from "./ProductCardGithubUrlContainer.astro";
import ProductCardImage from "./ProductCardImage.astro";
import ProductCardImageContainer from "./ProductCardImageContainer.astro";
import ProductCardName from "./ProductCardName.astro";
import ProductCardNameContainer from "./ProductCardNameContainer.astro";
import ProductCardPrimaryButtonText from "./ProductCardPrimaryButtonText.astro";
import ProductCardPrimaryButtonTextContainer from "./ProductCardPrimaryButtonTextContainer.astro";
import ProductCardProductUrl from "./ProductCardProductUrl.astro";
import ProductCardProductUrlContainer from "./ProductCardProductUrlContainer.astro";
import ProductCardSecondaryButtonText from "./ProductCardSecondaryButtonText.astro";
import ProductCardSecondaryButtonTextContainer from "./ProductCardSecondaryButtonTextContainer.astro";
import ProductCardBackground from "./ProductCardBackground.astro";
import ProductCardBackgroundContainer from "./ProductCardBackgroundContainer.astro";

export const ProductCardPackage = {
	ComponentContainers: {
		AppStoreUrl: ProductCardAppStoreUrlContainer,
		Background: ProductCardBackgroundContainer,
		Basic: ProductCardBasicContainer,
		ButtonLayout: ProductCardButtonLayoutContainer,
		Class: ProductCardClassContainer,
		Description: ProductCardDescriptionContainer,
		DescriptionLines: ProductCardDescriptionLinesContainer,
		EqualHeight: ProductCardEqualHeightContainer,
		GithubButtonText: ProductCardGithubButtonTextContainer,
		GithubUrl: ProductCardGithubUrlContainer,
		Image: ProductCardImageContainer,
		Name: ProductCardNameContainer,
		PrimaryButtonText: ProductCardPrimaryButtonTextContainer,
		ProductUrl: ProductCardProductUrlContainer,
		SecondaryButtonText: ProductCardSecondaryButtonTextContainer,
		Shadow: ProductCardShadowContainer,
		Size: ProductCardSizesContainer,
	},
	ComponentExamples: {
		AppStoreUrl: ProductCardAppStoreUrl,
		Background: ProductCardBackground,
		Basic: ProductCardBasic,
		ButtonLayout: ProductCardButtonLayout,
		Class: ProductCardClass,
		Description: ProductCardDescription,
		DescriptionLines: ProductCardDescriptionLines,
		EqualHeight: ProductCardEqualHeight,
		GithubButtonText: ProductCardGithubButtonText,
		GithubUrl: ProductCardGithubUrl,
		Image: ProductCardImage,
		Name: ProductCardName,
		PrimaryButtonText: ProductCardPrimaryButtonText,
		ProductUrl: ProductCardProductUrl,
		SecondaryButtonText: ProductCardSecondaryButtonText,
		Shadow: ProductCardShadow,
		Sizes: ProductCardSizes,
	},
};
