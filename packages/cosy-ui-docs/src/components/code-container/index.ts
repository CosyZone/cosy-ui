
import ECodeContainerMultiple from './ECodeContainerMultiple.astro.js';
import ECodeContainerIsolation from './ECodeContainerIsolation.astro.js';
import ECodeContainerBasic from './ECodeContainerBasic.astro.js';

export const CodeContainerPackage = {
    CodeContainerExamples: {
        Basic: ECodeContainerBasic,
        Multiple: ECodeContainerMultiple,
        Isolation: ECodeContainerIsolation,
    },
}; 