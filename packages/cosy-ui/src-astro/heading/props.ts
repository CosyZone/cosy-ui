import type { HTMLAttributes } from "astro/types";
import type { IHeadingPropsBase } from "../../src/components/heading/headingPropsBase";

/**
 * Heading 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface IHeadingProps
	extends IHeadingPropsBase,
		Omit<
			HTMLAttributes<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">,
			keyof IHeadingPropsBase
		> {
	// 继承基础属性和 HTML heading 属性，但避免冲突
}
