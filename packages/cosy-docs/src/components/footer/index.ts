// Footer 示例组件
import FooterBasic from './FooterBasic.astro';
import FooterComplete from './FooterComplete.astro';
import FooterWithLogo from './FooterWithLogo.astro';
import FooterWithNavigation from './FooterWithNavigation.astro';
import FooterWithProducts from './FooterWithProducts.astro';
import FooterWithSocial from './FooterWithSocial.astro';
import FooterWithFriendlyLinks from './FooterWithFriendlyLinks.astro';

// Footer 容器组件
import FooterBasicContainer from './FooterBasicContainer.astro';
import FooterCompleteContainer from './FooterCompleteContainer.astro';
import FooterFeaturesContainer from './FooterFeaturesContainer.astro';
import FooterWithLogoContainer from './FooterWithLogoContainer.astro';
import FooterWithNavigationContainer from './FooterWithNavigationContainer.astro';
import FooterWithProductsContainer from './FooterWithProductsContainer.astro';
import FooterWithSocialContainer from './FooterWithSocialContainer.astro';
import FooterWithFriendlyLinksContainer from './FooterWithFriendlyLinksContainer.astro';

export const FooterPackage = {
    FooterContainers: {
        Basic: FooterBasicContainer,
        Complete: FooterCompleteContainer,
        Features: FooterFeaturesContainer,
        WithLogo: FooterWithLogoContainer,
        WithNavigation: FooterWithNavigationContainer,
        WithProducts: FooterWithProductsContainer,
        WithSocial: FooterWithSocialContainer,
        WithFriendlyLinks: FooterWithFriendlyLinksContainer,
    },
    FooterExamples: {
        Basic: FooterBasic,
        Complete: FooterComplete,
        WithLogo: FooterWithLogo,
        WithNavigation: FooterWithNavigation,
        WithProducts: FooterWithProducts,
        WithSocial: FooterWithSocial,
        WithFriendlyLinks: FooterWithFriendlyLinks,
    },
}; 
