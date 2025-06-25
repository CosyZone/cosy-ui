import ELogoutBasicContainer from './ELogoutBasicContainer.astro.js';
import ELogoutCustomStyleContainer from './ELogoutCustomStyleContainer.astro.js';

export const LogoutPackage = {
    LogoutContainers: {
        Basic: ELogoutBasicContainer,
        CustomStyle: ELogoutCustomStyleContainer,
    },
}; 