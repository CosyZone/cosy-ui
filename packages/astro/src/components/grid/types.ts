import type { HTMLAttributes } from "astro/types";
import type { BackgroundColor } from "../../src/common/backgrounds";
import type { BorderSize } from "../../src/common/border";

type GapSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

type ResponsiveValue<T> =
	| T
	| {
			base?: T;
			sm?: T;
			md?: T;
			lg?: T;
			xl?: T;
			"2xl"?: T;
	  };

export interface GridProps extends HTMLAttributes<"div"> {
	/**
	 * 背景色类型，支持所有预设背景色和透明度变体
	 */
	background?: BackgroundColor;

	/**
	 * 网格列数，可以是固定值或响应式对象
	 * @default 1
	 */
	cols?: ResponsiveValue<number>;

	/**
	 * 网格间距
	 * @default "md"
	 */
	gap?: GapSize;

	/**
	 * 行间距，默认与gap相同
	 */
	rowGap?: GapSize;

	/**
	 * 列间距，默认与gap相同
	 */
	colGap?: GapSize;

	/**
	 * 垂直外边距
	 */
	marginY?: GapSize;

	/**
	 * 边框尺寸
	 */
	border?: BorderSize;

	/**
	 * 自定义类名
	 */
	class?: string;

	/**
	 * 类名列表
	 */
	"class:list"?: any;
}
