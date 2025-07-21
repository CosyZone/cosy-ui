import ContactBasic from './ContactBasic.astro';
import ContactWithTitle from './ContactWithTitle.astro';
import ContactSocial from './ContactSocial.astro';
import ContactCompact from './ContactCompact.astro';
import ContactCustomStyle from './ContactCustomStyle.astro';
import ContactBasicContainer from './ContactBasicContainer.astro';
import ContactWithTitleContainer from './ContactWithTitleContainer.astro';
import ContactSocialContainer from './ContactSocialContainer.astro';
import ContactCompactContainer from './ContactCompactContainer.astro';
import ContactCustomStyleContainer from './ContactCustomStyleContainer.astro';

export const ContactPackage = {
    ContactContainers: {
        Basic: ContactBasicContainer,
        WithTitle: ContactWithTitleContainer,
        Social: ContactSocialContainer,
        Compact: ContactCompactContainer,
        CustomStyle: ContactCustomStyleContainer,
    },
    ContactExamples: {
        Basic: ContactBasic,
        WithTitle: ContactWithTitle,
        Social: ContactSocial,
        Compact: ContactCompact,
        CustomStyle: ContactCustomStyle,
    },
}; 
