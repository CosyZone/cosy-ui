import ELoginBasic from './ELoginBasic.astro.js';
import ELoginBasicContainer from './ELoginBasicContainer.astro.js';
import ELoginCustomStyle from './ELoginCustomStyle.astro.js';
import ELoginCustomStyleContainer from './ELoginCustomStyleContainer.astro.js';

export const LoginPackage = {
    LoginContainers: {
        Basic: ELoginBasicContainer,
        CustomStyle: ELoginCustomStyleContainer,
    },
}; 