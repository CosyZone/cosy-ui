import Basic from './Basic.astro';
import BasicContainer from './BasicContainer.astro';
import Color from './Color.astro';
import ColorContainer from './ColorContainer.astro';
import Size from './Size.astro';
import SizeContainer from './SizeContainer.astro';
import Weight from './Weight.astro';
import WeightContainer from './WeightContainer.astro';
import Align from './Align.astro';
import AlignContainer from './AlignContainer.astro';
import Truncate from './Truncate.astro';
import TruncateContainer from './TruncateContainer.astro';
import CustomStyle from './CustomStyle.astro';
import CustomStyleContainer from './CustomStyleContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: BasicContainer,
        Color: ColorContainer,
        Size: SizeContainer,
        Weight: WeightContainer,
        Align: AlignContainer,
        Truncate: TruncateContainer,
        CustomStyle: CustomStyleContainer,
    },
}; 
