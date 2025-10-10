import TextVueBasicContainer from "./TextVueBasicContainer.astro";
import TextVueSizeContainer from "./TextVueSizeContainer.astro";
import TextVueWeightContainer from "./TextVueWeightContainer.astro";
import TextVueColorContainer from "./TextVueColorContainer.astro";
import TextVueAlignContainer from "./TextVueAlignContainer.astro";
import TextVueTruncateContainer from "./TextVueTruncateContainer.astro";
import TextVueCustomStyleContainer from "./TextVueCustomStyleContainer.astro";
import TextVueAsContainer from "./TextVueAsContainer.astro";
import TextVueItalicContainer from "./TextVueItalicContainer.astro";
import TextVueUnderlineContainer from "./TextVueUnderlineContainer.astro";
import TextVueStyleContainer from "./TextVueStyleContainer.astro";

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