import type { IContainerPropsBase } from "../../src/components/container/containerPropsBase";

/**
 * Container 组件的 Vue 版本属性接口（继承基础接口并扩展 Vue 特定属性）
 */
export interface IContainerProps extends IContainerPropsBase {
    // 继承所有基础属性，包括 border 和 borderColor
}
