import Card from './Card.astro';
import CardCourse from './CardCourse.astro';
import CardBasic from './CardBasic.astro';

// Container components
import CardBasicContainer from './ECardBasicContainer.astro';
import CardWithSubtitleContainer from './ECardWithSubtitleContainer.astro';
import CardWithImageContainer from './ECardWithImageContainer.astro';
import CardClickableContainer from './ECardClickableContainer.astro';
import CardCompactContainer from './ECardCompactContainer.astro';
import CardCustomStyleContainer from './ECardCustomStyleContainer.astro';

export { Card };
export { CardCourse };
export { CardBasic };

export const CardPackage = {
    Card,
    CardContainers: {
        Basic: CardBasicContainer,
        WithSubtitle: CardWithSubtitleContainer,
        WithImage: CardWithImageContainer,
        Clickable: CardClickableContainer,
        Compact: CardCompactContainer,
        CustomStyle: CardCustomStyleContainer,
    },
};
