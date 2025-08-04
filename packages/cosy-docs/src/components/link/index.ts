import BasicContainer from './BasicContainer.astro';
import ButtonStyleContainer from './ButtonStyleContainer.astro';
import VariantsContainer from './VariantsContainer.astro';
import AnimationsContainer from './AnimationsContainer.astro';
import AdvancedContainer from './AdvancedContainer.astro';
import LinkIconsContainer from './LinkIconsContainer.astro';
import ExternalContainer from './ExternalContainer.astro';
import SizesContainer from './SizesContainer.astro';
import BlockContainer from './BlockContainer.astro';
import CircleContainer from './CircleContainer.astro';
import GhostContainer from './GhostContainer.astro';
import RoundedContainer from './RoundedContainer.astro';
import NoUnderlineContainer from './NoUnderlineContainer.astro';
import FullWidthContainer from './FullWidthContainer.astro';
import ColorsContainer from './ColorsContainer.astro';
import AlignContainer from './AlignContainer.astro';
import ActiveContainer from './ActiveContainer.astro';
import NavigationTypeContainer from './NavigationTypeContainer.astro';
import DebugContainer from './DebugContainer.astro';
import CenterTextContainer from './CenterTextContainer.astro';
import CustomClassContainer from './CustomClassContainer.astro';
import ClassListContainer from './ClassListContainer.astro';
import RestContainer from './RestContainer.astro';

export const LinkPackage = {
    ComponentContainers: {
        Basic: BasicContainer,
        External: ExternalContainer,
        Variants: VariantsContainer,
        Sizes: SizesContainer,
        Animations: AnimationsContainer,
        Block: BlockContainer,
        ButtonStyle: ButtonStyleContainer,
        Circle: CircleContainer,
        Ghost: GhostContainer,
        Rounded: RoundedContainer,
        NoUnderline: NoUnderlineContainer,
        FullWidth: FullWidthContainer,
        Colors: ColorsContainer,
        Align: AlignContainer,
        Active: ActiveContainer,
        NavigationType: NavigationTypeContainer,
        Icons: LinkIconsContainer,
        Debug: DebugContainer,
        CenterText: CenterTextContainer,
        CustomClass: CustomClassContainer,
        ClassList: ClassListContainer,
        Rest: RestContainer,
        Advanced: AdvancedContainer,
    },
}; 
