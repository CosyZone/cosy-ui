import HeaderBasicContainer from './BasicContainer.astro';
import HeaderCustomNavbarCenterContainer from './CustomNavbarCenterContainer.astro';
import HeaderCustomNavbarEndContainer from './CustomNavbarEndContainer.astro';
import HeaderCustomNavbarStartContainer from './CustomNavbarStartContainer.astro';
import HeaderWithNavigationContainer from './WithNavigationContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: HeaderBasicContainer,
        WithNavigation: HeaderWithNavigationContainer,
        CustomNavbarStart: HeaderCustomNavbarStartContainer,
        CustomNavbarCenter: HeaderCustomNavbarCenterContainer,
        CustomNavbarEnd: HeaderCustomNavbarEndContainer,
    }
}; 
