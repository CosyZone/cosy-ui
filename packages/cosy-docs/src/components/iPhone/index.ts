import ApplePhoneNoFrame from './ApplePhoneNoFrame.astro';
import ApplePhoneDarkTheme from './ApplePhoneDarkTheme.astro';
import ApplePhoneHeightSm from './ApplePhoneHeightSm.astro';
import ApplePhoneHeightMd from './ApplePhoneHeightMd.astro';
import ApplePhoneHeightLg from './ApplePhoneHeightLg.astro';
import ApplePhoneHeightXl from './ApplePhoneHeightXl.astro';
import ApplePhoneBasicContainer from './ApplePhoneBasicContainer.astro';
import ApplePhoneCustomStyleContainer from './ApplePhoneCustomStyleContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: ApplePhoneBasicContainer,
        CustomStyle: ApplePhoneCustomStyleContainer,
    },
    Components: {
        NoFrame: ApplePhoneNoFrame,
        DarkTheme: ApplePhoneDarkTheme,
        HeightSm: ApplePhoneHeightSm,
        HeightMd: ApplePhoneHeightMd,
        HeightLg: ApplePhoneHeightLg,
        HeightXl: ApplePhoneHeightXl,
    },
};
