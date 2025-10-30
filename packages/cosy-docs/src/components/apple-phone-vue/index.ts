import ApplePhoneVueBackgroundColorContainer from "./ApplePhoneVueBackgroundColorContainer.astro";
import ApplePhoneVueBasicContainer from "./ApplePhoneVueBasicContainer.astro";
import ApplePhoneVueExamplesContainer from "./ApplePhoneVueExamplesContainer.astro";
import ApplePhoneVueHeightContainer from "./ApplePhoneVueHeightContainer.astro";
import ApplePhoneVueShowFrameContainer from "./ApplePhoneVueShowFrameContainer.astro";
import ApplePhoneVueSlotsContainer from "./ApplePhoneVueSlotsContainer.astro";
import ApplePhoneVueStatusBarButtonsContainer from "./ApplePhoneVueStatusBarButtonsContainer.astro";
import ApplePhoneVueTitleContainer from "./ApplePhoneVueTitleContainer.astro";
import ApplePhoneVueWithShadowContainer from "./ApplePhoneVueWithShadowContainer.astro";

export const ApplePhoneVuePackage = {
	Basic: ApplePhoneVueBasicContainer,
	BackgroundColor: ApplePhoneVueBackgroundColorContainer,
	Height: ApplePhoneVueHeightContainer,
	ShowFrame: ApplePhoneVueShowFrameContainer,
	StatusBarButtons: ApplePhoneVueStatusBarButtonsContainer,
	Title: ApplePhoneVueTitleContainer,
	WithShadow: ApplePhoneVueWithShadowContainer,
	Slots: ApplePhoneVueSlotsContainer,
	Examples: ApplePhoneVueExamplesContainer,
};
