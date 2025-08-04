import BasicContainer from './BasicContainer.astro';
import ButtonStyleContainer from './ButtonStyleContainer.astro';
import VariantsContainer from './VariantsContainer.astro';
import AnimationsContainer from './AnimationsContainer.astro';
import AdvancedContainer from './AdvancedContainer.astro';
import LinkIconsContainer from './LinkIconsContainer.astro';

export const LinkPackage = {
    ComponentContainers: {
        Basic: BasicContainer,
        ButtonStyle: ButtonStyleContainer,
        Variants: VariantsContainer,
        Animations: AnimationsContainer,
        Advanced: AdvancedContainer,
        Icons: LinkIconsContainer,
    },
}; 
