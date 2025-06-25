import ERegisterBasic from './ERegisterBasic.astro.js';
import ERegisterBasicContainer from './ERegisterBasicContainer.astro.js';
import ERegisterCustomStyle from './ERegisterCustomStyle.astro.js';
import ERegisterCustomStyleContainer from './ERegisterCustomStyleContainer.astro.js';

export const RegisterPackage = {
    RegisterContainers: {
        Basic: ERegisterBasicContainer,
        CustomStyle: ERegisterCustomStyleContainer,
    },
}; 