import ProductShowcaseExampleContainer from './ProductShowcaseExampleContainer.astro';
import ProductShowcaseProductsContainer from './ProductShowcaseProductsContainer.astro';
import ProductShowcaseBackgroundColorContainer from './ProductShowcaseBackgroundColorContainer.astro';
import ProductShowcaseBuyNowTextContainer from './ProductShowcaseBuyNowTextContainer.astro';
import ProductShowcaseLearnMoreTextContainer from './ProductShowcaseLearnMoreTextContainer.astro';
import ProductShowcaseNewLabelTextContainer from './ProductShowcaseNewLabelTextContainer.astro';
import ProductShowcaseOnBuyNowContainer from './ProductShowcaseOnBuyNowContainer.astro';
import ProductShowcaseOnLearnMoreContainer from './ProductShowcaseOnLearnMoreContainer.astro';
import ProductShowcaseClassContainer from './ProductShowcaseClassContainer.astro';

export const ProductShowcasePackage = {
    Example: ProductShowcaseExampleContainer,
    Products: ProductShowcaseProductsContainer,
    BackgroundColor: ProductShowcaseBackgroundColorContainer,
    BuyNowText: ProductShowcaseBuyNowTextContainer,
    LearnMoreText: ProductShowcaseLearnMoreTextContainer,
    NewLabelText: ProductShowcaseNewLabelTextContainer,
    OnBuyNow: ProductShowcaseOnBuyNowContainer,
    OnLearnMore: ProductShowcaseOnLearnMoreContainer,
    Class: ProductShowcaseClassContainer,
};
