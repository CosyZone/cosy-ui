import type { HTMLAttributes } from "astro/types";
import type { IMathFormulaPropsBase } from "./types";

/**
 * MathFormula 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface IMathFormulaProps
	extends IMathFormulaPropsBase,
		Omit<HTMLAttributes<"div">, keyof IMathFormulaPropsBase> {
	// 继承基础属性和 HTML div 属性，但避免冲突
}
