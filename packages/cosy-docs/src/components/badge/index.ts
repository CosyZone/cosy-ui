import BadgeBasic from './BadgeBasic.astro';
import BadgeBasicContainer from './BadgeBasicContainer.astro';
import BadgeSizes from './BadgeSizes.astro';
import BadgeOutline from './BadgeOutline.astro';
import OutlineContainer from './OutlineContainer.astro';
import SizesContainer from './SizesContainer.astro';
import BadgeVue from './BadgeVue.vue';
import VueContainer from './VueContainer.astro';

export const BadgePackage = {
    BadgeContainers: {
        Basic: BadgeBasicContainer,
        Outline: OutlineContainer,
        Sizes: SizesContainer,
        Vue: VueContainer,
    },
    BadgeExamples: {
        Basic: BadgeBasic,
        Sizes: BadgeSizes,
        Outline: BadgeOutline,
        Vue: BadgeVue,
    },
}; 
