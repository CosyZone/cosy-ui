import type { IAlertPropsBase } from "./alertPropsBase";
import { getBaseAlertClasses } from "./class-all";

/**
 * Alert 门面对象 - 统一的 Alert 组件接口
 *
 * 该门面提供 Alert 相关的功能，主要用于类名生成
 * Alert 组件较复杂（包含图标、标题、描述、操作按钮等），
 * 因此保留 Astro/Vue 组件的完整结构，门面主要提供类名相关功能
 *
 * @example
 * ```typescript
 * // 获取 Alert 的类名
 * const className = AlertFacade.getClassString({ type: 'info', variant: 'solid' });
 *
 * // 获取类名数组（高级用法）
 * const classes = AlertFacade.getClasses({ type: 'success' });
 * ```
 */
export const AlertFacade = {
    /**
     * 获取 Alert 的类名数组
     * 适用于需要精细控制类名的场景
     *
     * @param props - Alert 组件的属性
     * @returns 类名数组
     */
    getClasses: getBaseAlertClasses,

    /**
     * 获取 Alert 的类名字符串（便捷方法）
     * 适用于 CSR 框架如 Vue/React
     *
     * @param props - Alert 组件的属性
     * @returns 组合后的类名字符串
     */
    getClassString: (props: IAlertPropsBase): string => {
        return getBaseAlertClasses(props).filter(Boolean).join(" ");
    },
} as const;

/**
 * Alert 组件的属性接口
 */
export type { IAlertPropsBase };
