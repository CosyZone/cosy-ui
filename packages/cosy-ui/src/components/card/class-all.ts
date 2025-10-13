import type { ICardPropsBase } from "./cardPropsBase";
import { getBackgroundClass } from "../../../src/common/backgrounds";

/**
 * 计算 Card 组件的组合类名（用于基础接口）
 * @param props Card 组件的基础 props
 * @returns 组合后的类名数组
 */
export function getBaseCardClasses(props: ICardPropsBase): string[] {
    const {
        background,
        class: className = "",
        compact,
        href,
    } = props;

    // 获取背景色类名
    const backgroundClass = getBackgroundClass(background);

    // 构建卡片样式类
    const cardClasses = [
        "cosy:card",
        "cosy:w-full",
        backgroundClass || "cosy:bg-base-100",
        "cosy:shadow-xl",
        "cosy:hover:shadow-2xl",
        "cosy:transition-all",
        "cosy:duration-300",
        "cosy:ease-in-out",
        compact ? "cosy:card-compact" : "",
        href
            ? "cosy:cursor-pointer cosy:hover:scale-105 cosy:transform cosy:no-underline"
            : "",
        className,
    ];

    return cardClasses.filter(Boolean);
}

/**
 * 计算 Card 组件内容区域的 padding 类名
 * @param compact 是否使用紧凑模式
 * @returns padding 类名
 */
export function getCardPaddingClass(compact?: boolean): string {
    return compact ? "cosy:p-4" : "cosy:p-6";
}
