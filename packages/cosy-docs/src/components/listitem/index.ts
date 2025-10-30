import AnimationTypesContainer from "./AnimationTypesContainer.astro";
import BasicContainer from "./BasicContainer.astro";
import CustomDurationContainer from "./CustomDurationContainer.astro";
import LoadingContainer from "./LoadingContainer.astro";

export const ComponentPackage = {
	ComponentContainers: {
		Basic: BasicContainer,
		Loading: LoadingContainer,
		CustomDuration: CustomDurationContainer,
		AnimationTypes: AnimationTypesContainer,
	},
};
