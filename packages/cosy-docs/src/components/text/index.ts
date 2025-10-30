import AlignContainer from "./AlignContainer.astro";
import AsContainer from "./AsContainer.astro";
import BasicContainer from "./BasicContainer.astro";
import ColorContainer from "./ColorContainer.astro";
import CustomStyleContainer from "./CustomStyleContainer.astro";
import ItalicContainer from "./ItalicContainer.astro";
import SizeContainer from "./SizeContainer.astro";
import StyleContainer from "./StyleContainer.astro";
import TruncateContainer from "./TruncateContainer.astro";
import UnderlineContainer from "./UnderlineContainer.astro";
import WeightContainer from "./WeightContainer.astro";

export const ComponentPackage = {
	ComponentContainers: {
		Basic: BasicContainer,
		Color: ColorContainer,
		Size: SizeContainer,
		Weight: WeightContainer,
		Align: AlignContainer,
		Truncate: TruncateContainer,
		CustomStyle: CustomStyleContainer,
		As: AsContainer,
		Italic: ItalicContainer,
		Underline: UnderlineContainer,
		Style: StyleContainer,
	},
};
