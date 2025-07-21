import ECardBasicContainer from './ECardBasicContainer.astro';
import ECardWithSubtitleContainer from './ECardWithSubtitleContainer.astro';
import ECardWithImageContainer from './ECardWithImageContainer.astro';
import ECardClickableContainer from './ECardClickableContainer.astro';
import ECardCompactContainer from './ECardCompactContainer.astro';
import ECardCustomStyleContainer from './ECardCustomStyleContainer.astro';
import ECardCourseContainer from './ECardCourseContainer.astro';

export const CardPackage = {
    CardContainers: {
        Basic: ECardBasicContainer,
        WithSubtitle: ECardWithSubtitleContainer,
        WithImage: ECardWithImageContainer,
        Clickable: ECardClickableContainer,
        Compact: ECardCompactContainer,
        CustomStyle: ECardCustomStyleContainer,
        Course: ECardCourseContainer,
    }
}; 
