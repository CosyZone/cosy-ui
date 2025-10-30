import ApplePhoneBackgroundColorContainer from "./ApplePhoneBackgroundColorContainer.astro";
import ApplePhoneBasicContainer from "./ApplePhoneBasicContainer.astro";
import ApplePhoneExamplesContainer from "./ApplePhoneExamplesContainer.astro";
import ApplePhoneHeightContainer from "./ApplePhoneHeightContainer.astro";
import ApplePhoneShowFrameContainer from "./ApplePhoneShowFrameContainer.astro";
import ApplePhoneSlotsContainer from "./ApplePhoneSlotsContainer.astro";
import ApplePhoneTitleContainer from "./ApplePhoneTitleContainer.astro";
import ApplePhoneWithShadowContainer from "./ApplePhoneWithShadowContainer.astro";

export const ApplePhonePackage = {
	Basic: ApplePhoneBasicContainer,
	BackgroundColor: ApplePhoneBackgroundColorContainer,
	Height: ApplePhoneHeightContainer,
	ShowFrame: ApplePhoneShowFrameContainer,
	Title: ApplePhoneTitleContainer,
	WithShadow: ApplePhoneWithShadowContainer,
	Slots: ApplePhoneSlotsContainer,
	Examples: ApplePhoneExamplesContainer,
};
