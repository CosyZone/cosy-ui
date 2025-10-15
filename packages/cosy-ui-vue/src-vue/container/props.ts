import type { IContainerPropsBase } from "../../src/components/container/containerPropsBase";

/**
 * Container 组件的 Vue 版本属性接口（继承基础接口并扩展 Vue 特定属性）
 */
export interface IContainerProps extends IContainerPropsBase {
	/**
	 * 背景图片地址（Vue 版本只支持字符串格式的背景图地址）
	 */
	backgroundImage?: string;
}
