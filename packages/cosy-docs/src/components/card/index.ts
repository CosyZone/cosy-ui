import CardBasic from './CardBasic.astro';
import CardCourse from './CardCourse.astro';
import ECardBasic from './ECardBasic.astro';
import ECardWithSubtitle from './ECardWithSubtitle.astro';
import ECardWithImage from './ECardWithImage.astro';
import ECardClickable from './ECardClickable.astro';
import ECardCompact from './ECardCompact.astro';
import ECardCustomStyle from './ECardCustomStyle.astro';
import ECardBasicContainer from './ECardBasicContainer.astro';
import ECardWithSubtitleContainer from './ECardWithSubtitleContainer.astro';
import ECardWithImageContainer from './ECardWithImageContainer.astro';
import ECardClickableContainer from './ECardClickableContainer.astro';
import ECardCompactContainer from './ECardCompactContainer.astro';
import ECardCustomStyleContainer from './ECardCustomStyleContainer.astro';

export const CardPackage = {
    CardContainers: {
        Basic: ECardBasicContainer,
        WithSubtitle: ECardWithSubtitleContainer,
        WithImage: ECardWithImageContainer,
        Clickable: ECardClickableContainer,
        Compact: ECardCompactContainer,
        CustomStyle: ECardCustomStyleContainer,
    },
    CardExamples: {
        Basic: ECardBasic,
        WithSubtitle: ECardWithSubtitle,
        WithImage: ECardWithImage,
        Clickable: ECardClickable,
        Compact: ECardCompact,
        CustomStyle: ECardCustomStyle,
        // Special examples
        CardBasic: CardBasic,
        CardCourse: CardCourse,
    },
}; 
