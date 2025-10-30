import ContactAddressContainer from "./ContactAddressContainer.astro";
import ContactBackgroundContainer from "./ContactBackgroundContainer.astro";
import ContactBasic from "./ContactBasic.astro";
import ContactBasicContainer from "./ContactBasicContainer.astro";
import ContactCompact from "./ContactCompact.astro";
import ContactCompactContainer from "./ContactCompactContainer.astro";
import ContactCustomStyle from "./ContactCustomStyle.astro";
import ContactCustomStyleContainer from "./ContactCustomStyleContainer.astro";
import ContactEmailContainer from "./ContactEmailContainer.astro";
import ContactPhoneContainer from "./ContactPhoneContainer.astro";
import ContactSocial from "./ContactSocial.astro";
import ContactSocialContainer from "./ContactSocialContainer.astro";
import ContactWebsiteContainer from "./ContactWebsiteContainer.astro";
import ContactWechatQRContainer from "./ContactWechatQRContainer.astro";
import ContactWhatsappQRContainer from "./ContactWhatsappQRContainer.astro";
import ContactWithAddress from "./ContactWithAddress.astro";
import ContactWithBothQR from "./ContactWithBothQR.astro";
import ContactWithEmail from "./ContactWithEmail.astro";
import ContactWithoutAddress from "./ContactWithoutAddress.astro";
import ContactWithoutEmail from "./ContactWithoutEmail.astro";
import ContactWithoutPhone from "./ContactWithoutPhone.astro";
import ContactWithoutWebsite from "./ContactWithoutWebsite.astro";
import ContactWithPhone from "./ContactWithPhone.astro";
import ContactWithTitle from "./ContactWithTitle.astro";
import ContactWithTitleContainer from "./ContactWithTitleContainer.astro";
import ContactWithWebsite from "./ContactWithWebsite.astro";

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
		WechatQR: ContactWechatQRContainer,
		WhatsappQR: ContactWhatsappQRContainer,
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
		WithBothQR: ContactWithBothQR,
	},
};
