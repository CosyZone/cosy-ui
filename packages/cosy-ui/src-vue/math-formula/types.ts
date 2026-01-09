/**
 * MathFormula Vue 版本的属性类型
 */
export type MathFormulaVariant =
	| "default"
	| "gradient"
	| "glass"
	| "neon"
	| "card"
	| "spotlight";

export interface IMathFormulaProps {
	title?: string;
	number?: string | number;
	variant?: MathFormulaVariant;
	symbolsCollapsed?: boolean;
	class?: string;
}
