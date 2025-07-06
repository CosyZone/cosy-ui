import SectionBasic from './SectionBasic.astro';
import SectionCustom from './SectionCustom.astro';

import SectionBasicContainer from './SectionBasicContainer.astro';
import SectionCustomContainer from './SectionCustomContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: SectionBasicContainer,
        Custom: SectionCustomContainer,
    },
    Examples: {
        Basic: SectionBasic,
        Custom: SectionCustom,
    },
}; 