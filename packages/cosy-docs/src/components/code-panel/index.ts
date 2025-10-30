import BasicContainer from "./BasicContainer.astro";
import LanguageSupportContainer from "./LanguageSupportContainer.astro";
import ThemeExampleContainer from "./ThemeExampleContainer.astro";

export const ComponentPackage = {
	ComponentContainers: {
		Basic: BasicContainer,
		ThemeExample: ThemeExampleContainer,
		LanguageSupport: LanguageSupportContainer,
	},
};
