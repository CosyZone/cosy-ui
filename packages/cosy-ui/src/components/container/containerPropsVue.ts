import type { BackgroundColor } from "../../../src/common/backgrounds";
import type { Size } from "../../../src/common/size";
import type {
    FlexDirection,
    GapSize,
    FlexAlign,
    FlexJustify,
} from "../../../src/common/layout";
import type { PaddingSize } from "../../../src/common/padding";
import type { RoundedSize } from "../../../src/common/rounded";

export interface IContainerProps {
    /**
     * 是否显示边框
     * @default false
     */
    border?: boolean;

    /**
     * 是否居中显示
     * @default true
     */
    centered?: boolean;

    /**
     * 自定义类名
     */
    class?: string;

    /**
     * flex布局方向，不设置则不启用flex布局
     */
    flex?: FlexDirection;

    /**
     * flex项目间距
     * @default "none"
     */
    gap?: GapSize;

    /**
     * flex项目水平对齐方式
     */
    items?: FlexAlign;

    /**
     * flex项目垂直对齐方式
     */
    justify?: FlexJustify;

    /**
     * 内边距大小
     * @default "md"
     */
    padding?: PaddingSize;

    /**
     * （推荐）容器宽度（与 Astro 版本保持一致）
     * 与 size 等价；如同时传入，优先使用 width
     */
    width?: Size;

    /**
     * 圆角大小
     * @default "none"
     */
    rounded?: RoundedSize;

    /**
     * 预设的语义化背景色，支持 DaisyUI 主题系统
     * 包含透明度设置，使用 Tailwind v4 语法：bg-color/opacity
     * @default undefined
     */
    background?: BackgroundColor;
}