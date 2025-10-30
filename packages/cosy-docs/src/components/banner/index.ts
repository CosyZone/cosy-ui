import BannerAnimationsContainer from "./BannerAnimationsContainer.astro";
import BannerBasicContainer from "./BannerBasicContainer.astro";
import BannerClassContainer from "./BannerClassContainer.astro";
import BannerColorsContainer from "./BannerColorsContainer.astro";
import BannerCustomStyleContainer from "./BannerCustomStyleContainer.astro";
import BannerDangerContainer from "./BannerDangerContainer.astro";
import BannerInfoContainer from "./BannerInfoContainer.astro";
import BannerPrimaryContainer from "./BannerPrimaryContainer.astro";
import BannerSecondaryContainer from "./BannerSecondaryContainer.astro";
import BannerStyleContainer from "./BannerStyleContainer.astro";
import BannerSuccessContainer from "./BannerSuccessContainer.astro";
import BannerTextColorContainer from "./BannerTextColorContainer.astro";
import BannerWarningContainer from "./BannerWarningContainer.astro";

export const BannerPackage = {
	Animations: BannerAnimationsContainer,
	Basic: BannerBasicContainer,
	Colors: BannerColorsContainer,
	Class: BannerClassContainer,
	Style: BannerStyleContainer,
	TextColor: BannerTextColorContainer,
	CustomStyle: BannerCustomStyleContainer,
	Danger: BannerDangerContainer,
	Info: BannerInfoContainer,
	Primary: BannerPrimaryContainer,
	Secondary: BannerSecondaryContainer,
	Success: BannerSuccessContainer,
	Warning: BannerWarningContainer,
};
