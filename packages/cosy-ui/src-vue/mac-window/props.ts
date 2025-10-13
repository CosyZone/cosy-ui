import type { IMacWindowPropsBase } from "../../src/components/mac-window/macWindowPropsBase";
import type { BackgroundColor } from "../../src/common/backgrounds";

/**
 * MacWindow 组件的 Vue 版本属性接口（继承基础接口）
 */
export interface IMacWindowProps extends IMacWindowPropsBase {
	/**
	 * 背景色类型，支持所有预设背景色和透明度变体
	 */
	bgType?: BackgroundColor;

	/**
	 * 关闭窗口时调用的函数
	 */
	onCloseWindow?: () => void;

	/**
	 * 最小化窗口时调用的函数
	 */
	onMinimizeWindow?: () => void;

	/**
	 * 最大化窗口时调用的函数
	 */
	onMaximizeWindow?: () => void;

	/**
	 * 点击标签页时调用的函数，接收标签页值作为参数
	 */
	onTabClick?: (tab: string) => void;
}
