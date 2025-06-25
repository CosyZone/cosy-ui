import CardBasic from './CardBasic.astro.js';
import CardCourse from './CardCourse.astro.js';
import ECardBasic from './ECardBasic.astro.js';
import ECardWithSubtitle from './ECardWithSubtitle.astro.js';
import ECardWithImage from './ECardWithImage.astro.js';
import ECardClickable from './ECardClickable.astro.js';
import ECardCompact from './ECardCompact.astro.js';
import ECardCustomStyle from './ECardCustomStyle.astro.js';
import ECardBasicContainer from './ECardBasicContainer.astro.js';
import ECardWithSubtitleContainer from './ECardWithSubtitleContainer.astro.js';
import ECardWithImageContainer from './ECardWithImageContainer.astro.js';
import ECardClickableContainer from './ECardClickableContainer.astro.js';
import ECardCompactContainer from './ECardCompactContainer.astro.js';
import ECardCustomStyleContainer from './ECardCustomStyleContainer.astro.js';

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