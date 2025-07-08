import BasicContainer from './BasicContainer.astro';
import LoadingContainer from './LoadingContainer.astro';
import CustomDurationContainer from './CustomDurationContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: BasicContainer,
        Loading: LoadingContainer,
        CustomDuration: CustomDurationContainer,
    },
}; 
