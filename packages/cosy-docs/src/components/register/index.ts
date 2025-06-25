import ERegisterBasic from './ERegisterBasic.astro';
import ERegisterBasicContainer from './ERegisterBasicContainer.astro';
import ERegisterCustomStyle from './ERegisterCustomStyle.astro';
import ERegisterCustomStyleContainer from './ERegisterCustomStyleContainer.astro';

export const RegisterPackage = {
    RegisterContainers: {
        Basic: ERegisterBasicContainer,
        CustomStyle: ERegisterCustomStyleContainer,
    },
}; 
