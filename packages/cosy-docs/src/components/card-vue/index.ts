import CardVueBasicContainer from "./CardVueBasicContainer.astro";
import CardVueClickableContainer from "./CardVueClickableContainer.astro";
import CardVueCompactContainer from "./CardVueCompactContainer.astro";
import CardVueCustomStyleContainer from "./CardVueCustomStyleContainer.astro";
import CardVueMutedContainer from "./CardVueMutedContainer.astro";
import CardVueShadowContainer from "./CardVueShadowContainer.astro";
import CardVueWithContentContainer from "./CardVueWithContentContainer.astro";
import CardVueWithImageContainer from "./CardVueWithImageContainer.astro";
import CardVueWithSubtitleContainer from "./CardVueWithSubtitleContainer.astro";

export const CardVuePackage = {
	Basic: CardVueBasicContainer,
	CustomStyle: CardVueCustomStyleContainer,
	Compact: CardVueCompactContainer,
	Clickable: CardVueClickableContainer,
	WithImage: CardVueWithImageContainer,
	WithSubtitle: CardVueWithSubtitleContainer,
	WithContent: CardVueWithContentContainer,
	Shadow: CardVueShadowContainer,
	Muted: CardVueMutedContainer,
};
