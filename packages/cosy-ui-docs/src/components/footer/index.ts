// Footer 示例组件
import EFooterBasic from './EFooterBasic.astro.js';
import EFooterComplete from './EFooterComplete.astro.js';
import EFooterWithLogo from './EFooterWithLogo.astro.js';
import EFooterWithNavigation from './EFooterWithNavigation.astro.js';
import EFooterWithProducts from './EFooterWithProducts.astro.js';
import EFooterWithSocial from './EFooterWithSocial.astro.js';

// Footer 容器组件
import EFooterBasicContainer from './EFooterBasicContainer.astro.js';
import EFooterCompleteContainer from './EFooterCompleteContainer.astro.js';
import EFooterFeaturesContainer from './EFooterFeaturesContainer.astro.js';
import EFooterWithLogoContainer from './EFooterWithLogoContainer.astro.js';
import EFooterWithNavigationContainer from './EFooterWithNavigationContainer.astro.js';
import EFooterWithProductsContainer from './EFooterWithProductsContainer.astro.js';
import EFooterWithSocialContainer from './EFooterWithSocialContainer.astro.js';

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