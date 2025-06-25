import EContactBasic from './EContactBasic.astro';
import EContactWithTitle from './EContactWithTitle.astro';
import EContactSocial from './EContactSocial.astro';
import EContactCompact from './EContactCompact.astro';
import EContactCustomStyle from './EContactCustomStyle.astro';
import EContactBasicContainer from './EContactBasicContainer.astro';
import EContactWithTitleContainer from './EContactWithTitleContainer.astro';
import EContactSocialContainer from './EContactSocialContainer.astro';
import EContactCompactContainer from './EContactCompactContainer.astro';
import EContactCustomStyleContainer from './EContactCustomStyleContainer.astro';

export const ContactPackage = {
    ContactContainers: {
        Basic: EContactBasicContainer,
        WithTitle: EContactWithTitleContainer,
        Social: EContactSocialContainer,
        Compact: EContactCompactContainer,
        CustomStyle: EContactCustomStyleContainer,
    },
    ContactExamples: {
        Basic: EContactBasic,
        WithTitle: EContactWithTitle,
        Social: EContactSocial,
        Compact: EContactCompact,
        CustomStyle: EContactCustomStyle,
    },
}; 
