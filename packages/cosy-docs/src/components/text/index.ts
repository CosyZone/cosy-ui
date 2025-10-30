import Align from "./Align.astro";
import AlignContainer from "./AlignContainer.astro";
import As from "./As.astro";
import AsContainer from "./AsContainer.astro";
import Basic from "./Basic.astro";
import BasicContainer from "./BasicContainer.astro";
import Color from "./Color.astro";
import ColorContainer from "./ColorContainer.astro";
import CustomStyle from "./CustomStyle.astro";
import CustomStyleContainer from "./CustomStyleContainer.astro";
import Italic from "./Italic.astro";
import ItalicContainer from "./ItalicContainer.astro";
import Size from "./Size.astro";
import SizeContainer from "./SizeContainer.astro";
import Style from "./Style.astro";
import StyleContainer from "./StyleContainer.astro";
import Truncate from "./Truncate.astro";
import TruncateContainer from "./TruncateContainer.astro";
import Underline from "./Underline.astro";
import UnderlineContainer from "./UnderlineContainer.astro";
import Weight from "./Weight.astro";
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
