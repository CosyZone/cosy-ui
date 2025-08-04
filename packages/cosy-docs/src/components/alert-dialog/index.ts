import Basic from './Basic.astro';
import English from './English.astro';
import BasicContainer from './BasicContainer.astro';
import EnglishContainer from './EnglishContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: BasicContainer,
        English: EnglishContainer,
    },
}; 
