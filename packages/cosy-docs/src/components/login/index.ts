import ELoginBasic from './ELoginBasic.astro';
import ELoginBasicContainer from './ELoginBasicContainer.astro';
import ELoginCustomStyle from './ELoginCustomStyle.astro';
import ELoginCustomStyleContainer from './ELoginCustomStyleContainer.astro';

export const LoginPackage = {
    LoginContainers: {
        Basic: ELoginBasicContainer,
        CustomStyle: ELoginCustomStyleContainer,
    },
}; 
