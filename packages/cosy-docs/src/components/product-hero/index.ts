import ProductHeroExampleContainer from './ProductHeroExampleContainer.astro';
import ProductHeroProductsContainer from './ProductHeroProductsContainer.astro';
import ProductHeroBackgroundColorContainer from './ProductHeroBackgroundColorContainer.astro';
import ProductHeroBuyNowTextContainer from './ProductHeroBuyNowTextContainer.astro';
import ProductHeroLearnMoreTextContainer from './ProductHeroLearnMoreTextContainer.astro';
import ProductHeroNewLabelTextContainer from './ProductHeroNewLabelTextContainer.astro';
import ProductHeroOnBuyNowContainer from './ProductHeroOnBuyNowContainer.astro';
import ProductHeroOnLearnMoreContainer from './ProductHeroOnLearnMoreContainer.astro';
import ProductHeroClassContainer from './ProductHeroClassContainer.astro';

export const ProductHeroPackage = {
    Example: ProductHeroExampleContainer,
    Products: ProductHeroProductsContainer,
    BackgroundColor: ProductHeroBackgroundColorContainer,
    BuyNowText: ProductHeroBuyNowTextContainer,
    LearnMoreText: ProductHeroLearnMoreTextContainer,
    NewLabelText: ProductHeroNewLabelTextContainer,
    OnBuyNow: ProductHeroOnBuyNowContainer,
    OnLearnMore: ProductHeroOnLearnMoreContainer,
    Class: ProductHeroClassContainer,
};
