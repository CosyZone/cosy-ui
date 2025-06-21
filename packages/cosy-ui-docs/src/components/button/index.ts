// Button 容器组件 - 只导入确定存在的文件
import ButtonBasicContainer from './ButtonBasicContainer.astro';
import ButtonShapesContainer from './ButtonShapesContainer.astro';
import ButtonSizesContainer from './ButtonSizesContainer.astro';
import ButtonStatesContainer from './ButtonStatesContainer.astro';
import ButtonWithIconsContainer from './ButtonWithIconsContainer.astro';
import ButtonWidthContainer from './ButtonWidthContainer.astro';
import ButtonVariantsContainer from './ButtonVariantsContainer.astro';
import ButtonLinkContainer from './ButtonLinkContainer.astro';

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