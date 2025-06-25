import EContactBasic from './EContactBasic.astro.js';
import EContactWithTitle from './EContactWithTitle.astro.js';
import EContactSocial from './EContactSocial.astro.js';
import EContactCompact from './EContactCompact.astro.js';
import EContactCustomStyle from './EContactCustomStyle.astro.js';
import EContactBasicContainer from './EContactBasicContainer.astro.js';
import EContactWithTitleContainer from './EContactWithTitleContainer.astro.js';
import EContactSocialContainer from './EContactSocialContainer.astro.js';
import EContactCompactContainer from './EContactCompactContainer.astro.js';
import EContactCustomStyleContainer from './EContactCustomStyleContainer.astro.js';

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