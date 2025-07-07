import BasicContainer from './BasicContainer.astro';
import ThemeExampleContainer from './ThemeExampleContainer.astro';
import LanguageSupportContainer from './LanguageSupportContainer.astro';
import Basic from './Basic.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: BasicContainer,
        ThemeExample: ThemeExampleContainer,
        LanguageSupport: LanguageSupportContainer,
    },
}; 
