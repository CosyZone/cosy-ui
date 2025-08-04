import BasicContainer from './BasicContainer.astro';
import ButtonStyleContainer from './ButtonStyleContainer.astro';
import VariantsContainer from './VariantsContainer.astro';
import AnimationsContainer from './AnimationsContainer.astro';
import AdvancedContainer from './AdvancedContainer.astro';
import NavigationContainer from './NavigationContainer.astro';
import GithubContainer from './GithubContainer.astro';
import LinkBasic from './LinkBasic.astro';
import LinkVariants from './LinkVariants.astro';
import LinkAnimations from './LinkAnimations.astro';

export const LinkPackage = {
    ComponentContainers: {
        Basic: BasicContainer,
        ButtonStyle: ButtonStyleContainer,
        Variants: VariantsContainer,
        Animations: AnimationsContainer,
        Advanced: AdvancedContainer,
        Navigation: NavigationContainer,
        Github: GithubContainer,
    },
    Examples: {
        LinkBasic,
        LinkVariants,
        LinkAnimations,
    },
}; 
