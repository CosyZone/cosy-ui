import MainBasic from './MainBasic.astro';
import MainCustomSize from './MainCustomSize.astro';
import MainCustomPadding from './MainCustomPadding.astro';
import MainCustomBg from './MainCustomBg.astro';

import MainBasicContainer from './MainBasicContainer.astro';
import MainCustomSizeContainer from './MainCustomSizeContainer.astro';
import MainCustomPaddingContainer from './MainCustomPaddingContainer.astro';
import MainCustomBgContainer from './MainCustomBgContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: MainBasicContainer,
        CustomSize: MainCustomSizeContainer,
        CustomPadding: MainCustomPaddingContainer,
        CustomBg: MainCustomBgContainer,
    },
    Examples: {
        Basic: MainBasic,
        CustomSize: MainCustomSize,
        CustomPadding: MainCustomPadding,
        CustomBg: MainCustomBg,
    },
}; 
