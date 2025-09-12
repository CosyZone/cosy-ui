import ProductHeroExampleContainer from './ProductHeroExampleContainer.astro';
import ProductHeroNameContainer from './ProductHeroNameContainer.astro';
import ProductHeroDescriptionContainer from './ProductHeroDescriptionContainer.astro';
import ProductHeroImageContainer from './ProductHeroImageContainer.astro';
import ProductHeroPriceContainer from './ProductHeroPriceContainer.astro';
import ProductHeroIsNewContainer from './ProductHeroIsNewContainer.astro';
import ProductHeroAlignContainer from './ProductHeroAlignContainer.astro';
import ProductHeroBackgroundContainer from './ProductHeroBackgroundContainer.astro';
import ProductHeroBuyNowTextContainer from './ProductHeroBuyNowTextContainer.astro';
import ProductHeroLearnMoreTextContainer from './ProductHeroLearnMoreTextContainer.astro';
import ProductHeroNewLabelTextContainer from './ProductHeroNewLabelTextContainer.astro';
import ProductHeroOnBuyNowContainer from './ProductHeroOnBuyNowContainer.astro';
import ProductHeroOnLearnMoreContainer from './ProductHeroOnLearnMoreContainer.astro';
import ProductHeroClassContainer from './ProductHeroClassContainer.astro';
import ProductHeroLabelsContainer from './ProductHeroLabelsContainer.astro';

export const ProductHeroPackage = {
    Example: ProductHeroExampleContainer,
    Name: ProductHeroNameContainer,
    Description: ProductHeroDescriptionContainer,
    Image: ProductHeroImageContainer,
    Price: ProductHeroPriceContainer,
    // IsNew 已废弃
    Align: ProductHeroAlignContainer,
    Background: ProductHeroBackgroundContainer,
    // 以下已废弃：BuyNowText, LearnMoreText, NewLabelText, OnBuyNow, OnLearnMore
    Labels: ProductHeroLabelsContainer,
    Class: ProductHeroClassContainer,
};
