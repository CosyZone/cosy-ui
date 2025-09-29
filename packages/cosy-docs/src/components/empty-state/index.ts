import BasicContainer from "./BasicContainer.astro";
import CustomStyleContainer from "./CustomStyleContainer.astro";
import TitleContainer from "./TitleContainer.astro";
import DescriptionContainer from "./DescriptionContainer.astro";
import IconContainer from "./IconContainer.astro";
import SlotsContainer from "./SlotsContainer.astro";

export const EmptyStatePackage = {
	ComponentContainers: {
		Basic: BasicContainer,
		CustomStyle: CustomStyleContainer,
		Title: TitleContainer,
		Description: DescriptionContainer,
		Icon: IconContainer,
		Slots: SlotsContainer,
	},
};
