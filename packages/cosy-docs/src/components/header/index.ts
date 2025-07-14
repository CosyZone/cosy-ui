import HeaderBasicContainer from './BasicContainer.astro';
import HeaderCustomNavbarCenterContainer from './CustomNavbarCenterContainer.astro';
import HeaderCustomNavbarEndContainer from './CustomNavbarEndContainer.astro';
import HeaderCustomNavbarStartContainer from './CustomNavbarStartContainer.astro';
import HeaderWithNavigationContainer from './WithNavigationContainer.astro';
import HeaderWithoutI18nContainer from './WithoutI18nContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: HeaderBasicContainer,
        WithNavigation: HeaderWithNavigationContainer,
        WithoutI18n: HeaderWithoutI18nContainer,
        CustomNavbarStart: HeaderCustomNavbarStartContainer,
        CustomNavbarCenter: HeaderCustomNavbarCenterContainer,
        CustomNavbarEnd: HeaderCustomNavbarEndContainer,
    }
}; 
