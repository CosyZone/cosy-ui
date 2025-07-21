import CardBasicContainer from './CardBasicContainer.astro';
import CardWithSubtitleContainer from './CardWithSubtitleContainer.astro';
import CardWithImageContainer from './CardWithImageContainer.astro';
import CardClickableContainer from './CardClickableContainer.astro';
import CardCompactContainer from './CardCompactContainer.astro';
import CardCustomStyleContainer from './CardCustomStyleContainer.astro';

export const CardPackage = {
    CardContainers: {
        Basic: CardBasicContainer,
        WithSubtitle: CardWithSubtitleContainer,
        WithImage: CardWithImageContainer,
        Clickable: CardClickableContainer,
        Compact: CardCompactContainer,
        CustomStyle: CardCustomStyleContainer,
    }
}; 
