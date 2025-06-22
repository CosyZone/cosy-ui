
import ECodeContainerMultiple from './ECodeContainerMultiple.astro';
import ECodeContainerIsolation from './ECodeContainerIsolation.astro';
import ECodeContainerBasic from './ECodeContainerBasic.astro';

export const CodeContainerPackage = {
    CodeContainerExamples: {
        Basic: ECodeContainerBasic,
        Multiple: ECodeContainerMultiple,
        Isolation: ECodeContainerIsolation,
    },
}; 