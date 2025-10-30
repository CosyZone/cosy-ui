// Hero 示例组件

// Hero 容器组件
import AlignContainer from "./AlignContainer.astro";
import BackgroundContainer from "./BackgroundContainer.astro";
import BackgroundImageContainer from "./BackgroundImageContainer.astro";
import BasicContainer from "./BasicContainer.astro";
import GlassmorphismContainer from "./GlassmorphismContainer.astro";
import HeroAlignContainer from "./HeroAlignContainer.astro";
import HeroAppSlotContainer from "./HeroAppSlotContainer.astro";
import HeroBasic from "./HeroBasic.astro";
import HeroBasicContainer from "./HeroBasicContainer.astro";
import TextBackgroundContainer from "./TextBackgroundContainer.astro";
import WithButtonContainer from "./WithButtonContainer.astro";
import WithImageContainer from "./WithImageContainer.astro";

export const HeroPackage = {
	HeroExamples: {
		Basic: HeroBasic,
	},
	HeroContainers: {
		Align: HeroAlignContainer,
		Background: BackgroundContainer,
		BackgroundImage: BackgroundImageContainer,
		BackgroundOverlay: BackgroundImageContainer,
		Description: BasicContainer,
		Glassmorphism: GlassmorphismContainer,
		Image: WithImageContainer,
		ImagePosition: WithImageContainer,
		Links: WithButtonContainer,
		OverlayOpacity: BackgroundImageContainer,
		TextBackground: TextBackgroundContainer,
		Title: BasicContainer,
		App: HeroAppSlotContainer,
	},
	// 保持向后兼容
	Basic: BasicContainer,
	Align: AlignContainer,
	Background: BackgroundContainer,
	BackgroundImage: BackgroundImageContainer,
	WithButton: WithButtonContainer,
	WithImage: WithImageContainer,
};
