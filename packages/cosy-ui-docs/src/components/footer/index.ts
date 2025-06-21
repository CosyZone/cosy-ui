// Footer 示例组件
import EFooterBasic from './EFooterBasic.astro';
import EFooterComplete from './EFooterComplete.astro';
import EFooterWithLogo from './EFooterWithLogo.astro';
import EFooterWithNavigation from './EFooterWithNavigation.astro';
import EFooterWithProducts from './EFooterWithProducts.astro';
import EFooterWithSocial from './EFooterWithSocial.astro';

// Footer 容器组件
import EFooterBasicContainer from './EFooterBasicContainer.astro';
import EFooterCompleteContainer from './EFooterCompleteContainer.astro';
import EFooterFeaturesContainer from './EFooterFeaturesContainer.astro';
import EFooterWithLogoContainer from './EFooterWithLogoContainer.astro';
import EFooterWithNavigationContainer from './EFooterWithNavigationContainer.astro';
import EFooterWithProductsContainer from './EFooterWithProductsContainer.astro';
import EFooterWithSocialContainer from './EFooterWithSocialContainer.astro';

export const FooterPackage = {
    FooterContainers: {
        Basic: EFooterBasicContainer,
        Complete: EFooterCompleteContainer,
        Features: EFooterFeaturesContainer,
        WithLogo: EFooterWithLogoContainer,
        WithNavigation: EFooterWithNavigationContainer,
        WithProducts: EFooterWithProductsContainer,
        WithSocial: EFooterWithSocialContainer,
    },
    FooterExamples: {
        Basic: EFooterBasic,
        Complete: EFooterComplete,
        WithLogo: EFooterWithLogo,
        WithNavigation: EFooterWithNavigation,
        WithProducts: EFooterWithProducts,
        WithSocial: EFooterWithSocial,
    },
}; 