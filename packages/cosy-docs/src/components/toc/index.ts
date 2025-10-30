import TableOfContentsBasicContainer from "./TableOfContentsBasicContainer.astro";
import TableOfContentsCustom from "./TableOfContentsCustom.astro";
import TableOfContentsCustomContainer from "./TableOfContentsCustomContainer.astro";

export const ComponentPackage = {
	ComponentContainers: {
		Basic: TableOfContentsBasicContainer,
		Custom: TableOfContentsCustomContainer,
	},
	Examples: {
		Custom: TableOfContentsCustom,
	},
};
