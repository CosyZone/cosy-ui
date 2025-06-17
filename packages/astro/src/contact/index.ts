import Contact from './Contact.astro';

// Container components
import ContactBasicContainer from './EContactBasicContainer.astro';
import ContactWithTitleContainer from './EContactWithTitleContainer.astro';
import ContactSocialContainer from './EContactSocialContainer.astro';
import ContactCompactContainer from './EContactCompactContainer.astro';
import ContactCustomStyleContainer from './EContactCustomStyleContainer.astro';

export { Contact };

export const ContactPackage = {
    Contact,
    ContactContainers: {
        Basic: ContactBasicContainer,
        WithTitle: ContactWithTitleContainer,
        Social: ContactSocialContainer,
        Compact: ContactCompactContainer,
        CustomStyle: ContactCustomStyleContainer,
    },
}; 
