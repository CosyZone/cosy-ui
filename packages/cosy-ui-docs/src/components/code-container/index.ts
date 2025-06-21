import ECodeContainerBasic from './ECodeContainerBasic.astro';
import ECodeContainerMultiple from './ECodeContainerMultiple.astro';
import ECodeContainerIsolation from './ECodeContainerIsolation.astro';
import ECodeContainerBasicContainer from './ECodeContainerBasicContainer.astro';
import ECodeContainerMultipleContainer from './ECodeContainerMultipleContainer.astro';
import ECodeContainerIsolationContainer from './ECodeContainerIsolationContainer.astro';

export const CodeContainerPackage = {
    CodeContainerContainers: {
        Basic: ECodeContainerBasicContainer,
        Multiple: ECodeContainerMultipleContainer,
        Isolation: ECodeContainerIsolationContainer,
    },
    CodeContainerExamples: {
        Basic: ECodeContainerBasic,
        Multiple: ECodeContainerMultiple,
        Isolation: ECodeContainerIsolation,
    },
}; 