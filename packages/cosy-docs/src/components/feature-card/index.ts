// FeatureCard 示例组件

// FeatureCard 容器组件
import BackgroundContainer from "./BackgroundContainer.astro";
import ClassContainer from "./ClassContainer.astro";
import DescriptionContainer from "./DescriptionContainer.astro";
import FeatureCardBasic from "./FeatureCardBasic.astro";
import ImageContainer from "./ImageContainer.astro";
import TextColorContainer from "./TextColorContainer.astro";
import TitleContainer from "./TitleContainer.astro";

export const FeatureCardPackage = {
	FeatureCardExamples: {
		Basic: FeatureCardBasic,
	},
	FeatureCardContainers: {
		Background: BackgroundContainer,
		Class: ClassContainer,
		Description: DescriptionContainer,
		Image: ImageContainer,
		TextColor: TextColorContainer,
		Title: TitleContainer,
	},
};
