import TableOfContentsCustom from "./TableOfContentsCustom.astro";

import TableOfContentsBasicContainer from "./TableOfContentsBasicContainer.astro";
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
