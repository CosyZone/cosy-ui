import LoginBasicContainer from './LoginBasicContainer.astro';
import LoginCustomStyleContainer from './LoginCustomStyleContainer.astro';

export const LoginPackage = {
    LoginContainers: {
        Basic: LoginBasicContainer,
        CustomStyle: LoginCustomStyleContainer,
    },
}; 
