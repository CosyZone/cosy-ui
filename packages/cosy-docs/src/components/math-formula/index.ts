import MathFormulaBasic from "./MathFormulaBasic.astro";
import MathFormulaBasicContainer from "./MathFormulaBasicContainer.astro";
import MathFormulaCustomClass from "./MathFormulaCustomClass.astro";
import MathFormulaCustomClassContainer from "./MathFormulaCustomClassContainer.astro";
import MathFormulaSlots from "./MathFormulaSlots.astro";
import MathFormulaSlotsContainer from "./MathFormulaSlotsContainer.astro";
import MathFormulaSymbolsCollapsedContainer from "./MathFormulaSymbolsCollapsedContainer.astro";
import MathFormulaSymbolsCollapsedFalse from "./MathFormulaSymbolsCollapsedFalse.astro";
import MathFormulaSymbolsCollapsedTrue from "./MathFormulaSymbolsCollapsedTrue.astro";
import MathFormulaVariantCard from "./MathFormulaVariantCard.astro";
import MathFormulaVariantContainer from "./MathFormulaVariantContainer.astro";
import MathFormulaVariantDefault from "./MathFormulaVariantDefault.astro";
import MathFormulaVariantGlass from "./MathFormulaVariantGlass.astro";
import MathFormulaVariantGradient from "./MathFormulaVariantGradient.astro";
import MathFormulaVariantNeon from "./MathFormulaVariantNeon.astro";
import MathFormulaVariantSpotlight from "./MathFormulaVariantSpotlight.astro";

export const ComponentPackage = {
	Basic: MathFormulaBasicContainer,
	Variant: MathFormulaVariantContainer,
	SymbolsCollapsed: MathFormulaSymbolsCollapsedContainer,
	CustomClass: MathFormulaCustomClassContainer,
	Slots: MathFormulaSlotsContainer,
	Examples: {
		Basic: MathFormulaBasic,
		VariantCard: MathFormulaVariantCard,
		VariantDefault: MathFormulaVariantDefault,
		VariantGlass: MathFormulaVariantGlass,
		VariantGradient: MathFormulaVariantGradient,
		VariantNeon: MathFormulaVariantNeon,
		VariantSpotlight: MathFormulaVariantSpotlight,
		SymbolsCollapsedTrue: MathFormulaSymbolsCollapsedTrue,
		SymbolsCollapsedFalse: MathFormulaSymbolsCollapsedFalse,
		CustomClass: MathFormulaCustomClass,
		Slots: MathFormulaSlots,
	},
};
