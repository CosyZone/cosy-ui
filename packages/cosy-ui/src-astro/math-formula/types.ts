/**
 * MathFormula 组件的类型定义
 */

/**
 * 视觉风格变体
 */
export type MathFormulaVariant =
	| "default"
	| "gradient"
	| "glass"
	| "neon"
	| "card"
	| "spotlight";

/**
 * MathFormula 组件的基础属性接口（与框架无关）
 */
export interface IMathFormulaPropsBase {
	/**
	 * 公式标题，可选
	 */
	title?: string;

	/**
	 * 公式编号，可选
	 */
	number?: string | number;

	/**
	 * 视觉风格，支持多种预设样式
	 * @default "gradient"
	 */
	variant?: MathFormulaVariant;

	/**
	 * 符号说明是否默认折叠
	 * @default true
	 */
	symbolsCollapsed?: boolean;

	/**
	 * 自定义 CSS 类名，用于覆盖默认样式
	 */
	class?: string;
}
