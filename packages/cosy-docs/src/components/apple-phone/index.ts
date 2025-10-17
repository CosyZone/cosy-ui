import ApplePhoneBasicContainer from "./ApplePhoneBasicContainer.astro";
import ApplePhoneBackgroundColorContainer from "./ApplePhoneBackgroundColorContainer.astro";
import ApplePhoneHeightContainer from "./ApplePhoneHeightContainer.astro";
import ApplePhoneShowFrameContainer from "./ApplePhoneShowFrameContainer.astro";
import ApplePhoneTitleContainer from "./ApplePhoneTitleContainer.astro";
import ApplePhoneWithShadowContainer from "./ApplePhoneWithShadowContainer.astro";
import ApplePhoneSlotsContainer from "./ApplePhoneSlotsContainer.astro";

export const ApplePhonePackage = {
	Basic: ApplePhoneBasicContainer,
	BackgroundColor: ApplePhoneBackgroundColorContainer,
	Height: ApplePhoneHeightContainer,
	ShowFrame: ApplePhoneShowFrameContainer,
	Title: ApplePhoneTitleContainer,
	WithShadow: ApplePhoneWithShadowContainer,
	Slots: ApplePhoneSlotsContainer,
};
