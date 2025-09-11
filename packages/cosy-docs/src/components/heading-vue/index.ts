import AlignContainer from './AlignContainer.astro';
import AnchorContainer from './AnchorContainer.astro';
import BackgroundContainer from './BackgroundContainer.astro';
import CustomStyleContainer from './CustomStyleContainer.astro';
import ColorContainer from './ColorContainer.astro';
import ExternalContainer from './ExternalContainer.astro';
import HrefContainer from './HrefContainer.astro';
import IdContainer from './IdContainer.astro';
import LevelContainer from './LevelContainer.astro';
import MarginContainer from './MarginContainer.astro';
import PaddingContainer from './PaddingContainer.astro';
import UnderlineContainer from './UnderlineContainer.astro';
import WeightContainer from './WeightContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Align: AlignContainer,
        Anchor: AnchorContainer,
        Background: BackgroundContainer,
        Class: CustomStyleContainer,
        Color: ColorContainer,
        External: ExternalContainer,
        Href: HrefContainer,
        Id: IdContainer,
        Level: LevelContainer,
        Margin: MarginContainer,
        Padding: PaddingContainer,
        Underline: UnderlineContainer,
        Weight: WeightContainer,
    },
};
