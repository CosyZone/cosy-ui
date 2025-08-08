import CardBasicContainer from './CardBasicContainer.astro';
import CardWithSubtitleContainer from './CardWithSubtitleContainer.astro';
import CardWithImageContainer from './CardWithImageContainer.astro';
import CardClickableContainer from './CardClickableContainer.astro';
import CardCompactContainer from './CardCompactContainer.astro';
import CardCustomStyleContainer from './CardCustomStyleContainer.astro';
import Cases from './Cases.astro';
import MultipleCards from './MultipleCards.astro';

export const CardPackage = {
    Cases,
    MultipleCards,
    CardContainers: {
        Basic: CardBasicContainer,
        WithSubtitle: CardWithSubtitleContainer,
        WithImage: CardWithImageContainer,
        Clickable: CardClickableContainer,
        Compact: CardCompactContainer,
        CustomStyle: CardCustomStyleContainer,
    }
}; 