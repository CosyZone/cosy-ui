// Button 容器组件 - 只导入确定存在的文件
import ButtonBasicContainer from './ButtonBasicContainer.astro.js';
import ButtonShapesContainer from './ButtonShapesContainer.astro.js';
import ButtonSizesContainer from './ButtonSizesContainer.astro.js';
import ButtonStatesContainer from './ButtonStatesContainer.astro.js';
import ButtonWithIconsContainer from './ButtonWithIconsContainer.astro.js';
import ButtonWidthContainer from './ButtonWidthContainer.astro.js';
import ButtonVariantsContainer from './ButtonVariantsContainer.astro.js';
import ButtonLinkContainer from './ButtonLinkContainer.astro.js';

export const ButtonPackage = {
    ButtonContainers: {
        Basic: ButtonBasicContainer,
        Shapes: ButtonShapesContainer,
        Sizes: ButtonSizesContainer,
        States: ButtonStatesContainer,
        WithIcons: ButtonWithIconsContainer,
        Width: ButtonWidthContainer,
        Variants: ButtonVariantsContainer,
        Link: ButtonLinkContainer,
    },
}; 