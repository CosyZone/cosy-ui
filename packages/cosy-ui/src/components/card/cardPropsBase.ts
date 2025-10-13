import type { BackgroundColor } from "../../../src/common/backgrounds";

/**
 * Card 组件的基础属性接口（与框架无关）
 */
export interface ICardPropsBase {
    /**
     * 背景色类型，支持所有预设背景色和透明度变体
     */
    background?: BackgroundColor;

    /**
     * 自定义CSS类，可用于覆盖默认样式
     */
    class?: string;

    /**
     * 是否使用紧凑模式
     */
    compact?: boolean;

    /**
     * 如果提供，卡片将变成可点击的链接
     */
    href?: string;

    /**
     * 是否使用柔和色样式（未激活状态）
     */
    muted?: boolean;

    /**
     * 卡片副标题或描述
     */
    subtitle?: string;

    /**
     * 卡片标题
     */
    title: string;
}
