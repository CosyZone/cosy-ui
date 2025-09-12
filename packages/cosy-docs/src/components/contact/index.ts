import ContactBasic from './ContactBasic.astro';
import ContactWithTitle from './ContactWithTitle.astro';
import ContactSocial from './ContactSocial.astro';
import ContactCompact from './ContactCompact.astro';
import ContactCustomStyle from './ContactCustomStyle.astro';
import ContactWithAddress from './ContactWithAddress.astro';
import ContactWithoutAddress from './ContactWithoutAddress.astro';
import ContactWithEmail from './ContactWithEmail.astro';
import ContactWithoutEmail from './ContactWithoutEmail.astro';
import ContactWithPhone from './ContactWithPhone.astro';
import ContactWithoutPhone from './ContactWithoutPhone.astro';
import ContactWithWebsite from './ContactWithWebsite.astro';
import ContactWithoutWebsite from './ContactWithoutWebsite.astro';
import ContactBasicContainer from './ContactBasicContainer.astro';
import ContactWithTitleContainer from './ContactWithTitleContainer.astro';
import ContactSocialContainer from './ContactSocialContainer.astro';
import ContactCompactContainer from './ContactCompactContainer.astro';
import ContactCustomStyleContainer from './ContactCustomStyleContainer.astro';
import ContactAddressContainer from './ContactAddressContainer.astro';
import ContactEmailContainer from './ContactEmailContainer.astro';
import ContactPhoneContainer from './ContactPhoneContainer.astro';
import ContactWebsiteContainer from './ContactWebsiteContainer.astro';
import ContactBackgroundContainer from './ContactBackgroundContainer.astro';

export const ContactPackage = {
    ContactContainers: {
        Address: ContactAddressContainer,
        Background: ContactBackgroundContainer,
        Basic: ContactBasicContainer,
        WithTitle: ContactWithTitleContainer,
        Social: ContactSocialContainer,
        Compact: ContactCompactContainer,
        CustomStyle: ContactCustomStyleContainer,
        Email: ContactEmailContainer,
        Phone: ContactPhoneContainer,
        Website: ContactWebsiteContainer,
    },
    ContactExamples: {
        Basic: ContactBasic,
        WithTitle: ContactWithTitle,
        Social: ContactSocial,
        Compact: ContactCompact,
        CustomStyle: ContactCustomStyle,
        WithAddress: ContactWithAddress,
        WithoutAddress: ContactWithoutAddress,
        WithEmail: ContactWithEmail,
        WithoutEmail: ContactWithoutEmail,
        WithPhone: ContactWithPhone,
        WithoutPhone: ContactWithoutPhone,
        WithWebsite: ContactWithWebsite,
        WithoutWebsite: ContactWithoutWebsite,
    },
}; 
