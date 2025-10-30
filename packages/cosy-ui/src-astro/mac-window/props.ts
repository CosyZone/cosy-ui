import type { HTMLAttributes } from "astro/types";
import type { BackgroundColor } from "../../src/common/backgrounds";
import type { IMacWindowPropsBase } from "../../src/components/mac-window/macWindowPropsBase";

/**
 * MacWindow 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface IMacWindowProps
	extends IMacWindowPropsBase,
		Omit<HTMLAttributes<"div">, keyof IMacWindowPropsBase> {
	/**
	 * 背景色类型，支持所有预设背景色和透明度变体
	 */
	bgType?: BackgroundColor;
}
