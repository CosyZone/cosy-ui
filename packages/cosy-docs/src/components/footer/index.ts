// Footer 示例组件
import FooterBasic from './FooterBasic.astro';
import FooterComplete from './FooterComplete.astro';
import FooterWithLogo from './FooterWithLogo.astro';
import FooterWithNavigation from './FooterWithNavigation.astro';
import FooterWithProducts from './FooterWithProducts.astro';
import FooterWithSocial from './FooterWithSocial.astro';
import FooterWithFriendlyLinks from './FooterWithFriendlyLinks.astro';
import FooterBackground from './FooterBackground.astro';

// Footer 容器组件
import FooterBasicContainer from './FooterBasicContainer.astro';
import FooterCompleteContainer from './FooterCompleteContainer.astro';
import FooterFeaturesContainer from './FooterFeaturesContainer.astro';
import FooterWithLogoContainer from './FooterWithLogoContainer.astro';
import FooterWithNavigationContainer from './FooterWithNavigationContainer.astro';
import FooterWithProductsContainer from './FooterWithProductsContainer.astro';
import FooterWithSocialContainer from './FooterWithSocialContainer.astro';
import FooterWithFriendlyLinksContainer from './FooterWithFriendlyLinksContainer.astro';
import FooterBackgroundContainer from './FooterBackgroundContainer.astro';
import FooterAboutLinkContainer from './FooterAboutLinkContainer.astro';
import FooterBlogLinkContainer from './FooterBlogLinkContainer.astro';
import FooterCareersLinkContainer from './FooterCareersLinkContainer.astro';
import FooterContactLinkContainer from './FooterContactLinkContainer.astro';
import FooterWithWechatQRContainer from './FooterWithWechatQRContainer.astro';
import FooterQRContainer from './FooterQRContainer.astro';
import FooterContactInfoContainer from './FooterContactInfoContainer.astro';

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
        Background: FooterBackgroundContainer,
        AboutLink: FooterAboutLinkContainer,
        BlogLink: FooterBlogLinkContainer,
        CareersLink: FooterCareersLinkContainer,
        ContactLink: FooterContactLinkContainer,
        WithWechatQR: FooterWithWechatQRContainer,
        QR: FooterQRContainer,
        ContactInfo: FooterContactInfoContainer,
    },
    FooterExamples: {
        Basic: FooterBasic,
        Complete: FooterComplete,
        WithLogo: FooterWithLogo,
        WithNavigation: FooterWithNavigation,
        WithProducts: FooterWithProducts,
        WithSocial: FooterWithSocial,
        WithFriendlyLinks: FooterWithFriendlyLinks,
        Background: FooterBackground,
    },
}; 
