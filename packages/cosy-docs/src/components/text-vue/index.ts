import TextVueAlignContainer from "./TextVueAlignContainer.astro";
import TextVueAsContainer from "./TextVueAsContainer.astro";
import TextVueBasicContainer from "./TextVueBasicContainer.astro";
import TextVueColorContainer from "./TextVueColorContainer.astro";
import TextVueCustomStyleContainer from "./TextVueCustomStyleContainer.astro";
import TextVueItalicContainer from "./TextVueItalicContainer.astro";
import TextVueSizeContainer from "./TextVueSizeContainer.astro";
import TextVueStyleContainer from "./TextVueStyleContainer.astro";
import TextVueTruncateContainer from "./TextVueTruncateContainer.astro";
import TextVueUnderlineContainer from "./TextVueUnderlineContainer.astro";
import TextVueWeightContainer from "./TextVueWeightContainer.astro";

// Vue 版本的 Text 组件包
export const ComponentPackage = {
	ComponentContainers: {
		Basic: TextVueBasicContainer,
		Size: TextVueSizeContainer,
		Weight: TextVueWeightContainer,
		Color: TextVueColorContainer,
		Align: TextVueAlignContainer,
		Truncate: TextVueTruncateContainer,
		CustomStyle: TextVueCustomStyleContainer,
		As: TextVueAsContainer,
		Italic: TextVueItalicContainer,
		Underline: TextVueUnderlineContainer,
		Style: TextVueStyleContainer,
	},
};
