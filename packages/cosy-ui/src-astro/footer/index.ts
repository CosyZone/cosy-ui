import Footer from './Footer.astro';
import FooterBasicContainer from './EFooterBasicContainer.astro';
import FooterWithSocialContainer from './EFooterWithSocialContainer.astro';
import FooterWithProductsContainer from './EFooterWithProductsContainer.astro';
import FooterWithLogoContainer from './EFooterWithLogoContainer.astro';
import FooterWithNavigationContainer from './EFooterWithNavigationContainer.astro';
import FooterCompleteContainer from './EFooterCompleteContainer.astro';
import FooterFeaturesContainer from './EFooterFeaturesContainer.astro';
import EFooterBasicSourceCode from './EFooterBasic.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { default as Footer } from './Footer.astro';

// 导出示例源代码
export const FooterExampleCodes = {
  Basic: extractSimpleExample(EFooterBasicSourceCode, 'Footer'),
};

// 导出页脚包
export const FooterPackage = {
  Footer,
  FooterContainers: {
    Basic: FooterBasicContainer,
    WithSocial: FooterWithSocialContainer,
    WithProducts: FooterWithProductsContainer,
    WithLogo: FooterWithLogoContainer,
    WithNavigation: FooterWithNavigationContainer,
    Complete: FooterCompleteContainer,
    Features: FooterFeaturesContainer,
  },
};
