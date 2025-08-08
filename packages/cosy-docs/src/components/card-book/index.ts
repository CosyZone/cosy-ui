
import CardBookDescription from './CardBookDescription.astro';
import CardBookHref from './CardBookHref.astro';
import CardBookClass from './CardBookClass.astro';
import CardBookCases from './CardBookCases.astro';
import CardBookCasesGrid from './CardBookCasesGrid.astro';
import CardBookCoverContainer from './CardBookCoverContainer.astro';
import CardBookSizesContainer from './CardBookSizesContainer.astro';
import CardBookShadowContainer from './CardBookShadowContainer.astro';
import CardBookHrefContainer from './CardBookHrefContainer.astro';
import CardBookDescriptionContainer from './CardBookDescriptionContainer.astro';
import CardBookClassContainer from './CardBookClassContainer.astro';
import CardBookAuthorContainer from './CardBookAuthorContainer.astro';
import CardBookTitleContainer from './CardBookTitleContainer.astro';

export const CardBookPackage = {
    ComponentExamples: {
        Description: CardBookDescription,
        Href: CardBookHref,
        Class: CardBookClass,
        Cases: CardBookCases,
        CasesGrid: CardBookCasesGrid,
    },
    ComponentContainers: {
        Basic: CardBookAuthorContainer,
        Sizes: CardBookSizesContainer,
        Shadow: CardBookShadowContainer,
        Description: CardBookDescriptionContainer,
        Href: CardBookHrefContainer,
        Class: CardBookClassContainer,
        Cover: CardBookCoverContainer,
        Title: CardBookTitleContainer,
    },
};


