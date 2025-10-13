// 定义窗口高度类型
export type MacWindowHeight = string;

// 定义窗口宽度类型
export type MacWindowWidth = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";

// 定义 MacWindow 组件的基础属性接口（与框架无关）
export interface IMacWindowPropsBase {
    /**
     * 窗口高度
     * @default "h-96"
     */
    height?: MacWindowHeight;

    /**
     * 窗口宽度，支持 Container 组件的 width 属性值
     * @default "md"
     */
    width?: MacWindowWidth;

    /**
     * 窗口标题
     * @default ""
     */
    title?: string;

    /**
     * 是否显示阴影效果
     * @default true
     */
    withShadow?: boolean;

    /**
     * 标签页字符串数组
     * @default []
     */
    tabs?: string[];

    /**
     * 默认选中的标签页
     * @default ""
     */
    defaultTab?: string;

    /**
     * 窗口唯一标识符，用于标签页切换
     * @default ""
     */
    id?: string;

    /**
     * 背景色类型，支持所有预设背景色和透明度变体
     * @default "base-100"
     */
    bgType?: string;
}
