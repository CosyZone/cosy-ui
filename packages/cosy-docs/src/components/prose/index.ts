import BasicContainer from "./BasicContainer.astro";
import ClassContainer from "./ClassContainer.astro";
import CustomStyleContainer from "./CustomStyleContainer.astro";

export const ComponentPackage = {
	ComponentContainers: {
		Basic: BasicContainer,
		CustomStyle: CustomStyleContainer,
		Class: ClassContainer,
	},
};
