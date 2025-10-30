// FeatureCarousel 示例组件

// FeatureCarousel 容器组件
import ClassContainer from "./ClassContainer.astro";
import FeatureCarouselBasic from "./FeatureCarouselBasic.astro";
import FeaturesContainer from "./FeaturesContainer.astro";

export const FeatureCarouselPackage = {
	FeatureCarouselExamples: {
		Basic: FeatureCarouselBasic,
	},
	FeatureCarouselContainers: {
		Class: ClassContainer,
		Features: FeaturesContainer,
	},
};
