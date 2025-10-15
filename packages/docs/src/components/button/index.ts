import ButtonBasicContainer from "./ButtonBasicContainer.astro";
import ButtonShapesContainer from "./ButtonShapesContainer.astro";
import ButtonSizesContainer from "./ButtonSizesContainer.astro";
import ButtonStatesContainer from "./ButtonStatesContainer.astro";
import ButtonWithIconsContainer from "./ButtonWithIconsContainer.astro";
import ButtonWidthContainer from "./ButtonWidthContainer.astro";
import ButtonVariantsContainer from "./ButtonVariantsContainer.astro";
import ButtonLinkContainer from "./ButtonLinkContainer.astro";
import ButtonTypesContainer from "./ButtonTypesContainer.astro";
import ButtonClassContainer from "./ButtonClassContainer.astro";
import ButtonFormmethodContainer from "./ButtonFormmethodContainer.astro";
import ButtonOnClickContainer from "./ButtonOnClickContainer.astro";
import ButtonSlotDefaultContainer from "./ButtonSlotDefaultContainer.astro";

export const ButtonPackage = {
	Basic: ButtonBasicContainer,
	Class: ButtonClassContainer,
	Formmethod: ButtonFormmethodContainer,
	Link: ButtonLinkContainer,
	OnClick: ButtonOnClickContainer,
	Shapes: ButtonShapesContainer,
	Sizes: ButtonSizesContainer,
	States: ButtonStatesContainer,
	Variants: ButtonVariantsContainer,
	Width: ButtonWidthContainer,
	WithIcons: ButtonWithIconsContainer,
	Types: ButtonTypesContainer,
	SlotDefault: ButtonSlotDefaultContainer,
};
