import ButtonVueBasicContainer from "./ButtonVueBasicContainer.astro";
import ButtonVueFormmethodContainer from "./ButtonVueFormmethodContainer.astro";
import ButtonVueGradientVariantsContainer from "./ButtonVueGradientVariantsContainer.astro";
import ButtonVueLinkContainer from "./ButtonVueLinkContainer.astro";
import ButtonVueOnClickContainer from "./ButtonVueOnClickContainer.astro";
import ButtonVueShapesContainer from "./ButtonVueShapesContainer.astro";
import ButtonVueSizesContainer from "./ButtonVueSizesContainer.astro";
import ButtonVueSlotDefaultContainer from "./ButtonVueSlotDefaultContainer.astro";
import ButtonVueStatesContainer from "./ButtonVueStatesContainer.astro";
import ButtonVueTypesContainer from "./ButtonVueTypesContainer.astro";
import ButtonVueVariantsContainer from "./ButtonVueVariantsContainer.astro";
import ButtonVueWidthContainer from "./ButtonVueWidthContainer.astro";
import ButtonVueWithIconsContainer from "./ButtonVueWithIconsContainer.astro";

export const ButtonVuePackage = {
	Basic: ButtonVueBasicContainer,
	Sizes: ButtonVueSizesContainer,
	Variants: ButtonVueVariantsContainer,
	Shapes: ButtonVueShapesContainer,
	States: ButtonVueStatesContainer,
	WithIcons: ButtonVueWithIconsContainer,
	Width: ButtonVueWidthContainer,
	Link: ButtonVueLinkContainer,
	SlotDefault: ButtonVueSlotDefaultContainer,
	Types: ButtonVueTypesContainer,
	Formmethod: ButtonVueFormmethodContainer,
	OnClick: ButtonVueOnClickContainer,
	GradientVariants: ButtonVueGradientVariantsContainer,
};
