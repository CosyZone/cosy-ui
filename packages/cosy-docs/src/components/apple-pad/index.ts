import ApplePadBackgroundColorContainer from "./ApplePadBackgroundColorContainer.astro";
import ApplePadExamplesContainer from "./ApplePadExamplesContainer.astro";
import ApplePadHeightContainer from "./ApplePadHeightContainer.astro";
import ApplePadShowFrameContainer from "./ApplePadShowFrameContainer.astro";
import ApplePadSlotsContainer from "./ApplePadSlotsContainer.astro";
import ApplePadTitleContainer from "./ApplePadTitleContainer.astro";
import ApplePadWithShadowContainer from "./ApplePadWithShadowContainer.astro";

export const ApplePadPackage = {
	Basic: ApplePadExamplesContainer,
	BackgroundColor: ApplePadBackgroundColorContainer,
	Height: ApplePadHeightContainer,
	ShowFrame: ApplePadShowFrameContainer,
	Slots: ApplePadSlotsContainer,
	Title: ApplePadTitleContainer,
	WithShadow: ApplePadWithShadowContainer,
};
