import AlertVueBasicContainer from './AlertVueBasicContainer.astro';
import AlertVueTypesContainer from './AlertVueTypesContainer.astro';
import AlertVueCustomStyleContainer from './AlertVueCustomStyleContainer.astro';
import AlertVueWithTitleContainer from './AlertVueWithTitleContainer.astro';
import AlertVueClosableContainer from './AlertVueClosableContainer.astro';
import AlertVueActionContainer from './AlertVueActionContainer.astro';

export const AlertVuePackage = {
    Action: AlertVueActionContainer,
    Basic: AlertVueBasicContainer,
    Closable: AlertVueClosableContainer,
    CustomStyle: AlertVueCustomStyleContainer,
    Types: AlertVueTypesContainer,
    WithTitle: AlertVueWithTitleContainer,
};
