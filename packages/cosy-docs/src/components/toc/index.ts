import TableOfContentsBasic from './TableOfContentsBasic.astro';
import TableOfContentsCustom from './TableOfContentsCustom.astro';

import TableOfContentsBasicContainer from './TableOfContentsBasicContainer.astro';
import TableOfContentsCustomContainer from './TableOfContentsCustomContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: TableOfContentsBasicContainer,
        Custom: TableOfContentsCustomContainer,
    },
    Examples: {
        Basic: TableOfContentsBasic,
        Custom: TableOfContentsCustom,
    },
}; 
