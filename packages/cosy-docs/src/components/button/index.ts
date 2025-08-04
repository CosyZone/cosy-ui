import ButtonBasicContainer from './ButtonBasicContainer.astro';
import ButtonShapesContainer from './ButtonShapesContainer.astro';
import ButtonSizesContainer from './ButtonSizesContainer.astro';
import ButtonStatesContainer from './ButtonStatesContainer.astro';
import ButtonWithIconsContainer from './ButtonWithIconsContainer.astro';
import ButtonWidthContainer from './ButtonWidthContainer.astro';
import ButtonVariantsContainer from './ButtonVariantsContainer.astro';
import ButtonLinkContainer from './ButtonLinkContainer.astro';

export const ButtonPackage = {
    Basic: ButtonBasicContainer,
    Link: ButtonLinkContainer,
    Shapes: ButtonShapesContainer,
    Sizes: ButtonSizesContainer,
    States: ButtonStatesContainer,
    Variants: ButtonVariantsContainer,
    Width: ButtonWidthContainer,
    WithIcons: ButtonWithIconsContainer,
}; 
