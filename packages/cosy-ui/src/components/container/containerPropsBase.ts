import type { BackgroundColor } from "../../../src/common/backgrounds";
import type { Size } from "../../../src/common/size";
import type { HeightSize } from "../../../src/common/height";
import type {
    FlexDirection,
    GapSize,
    FlexAlign,
    FlexJustify,
} from "../../../src/common/layout";
import type { PaddingSize } from "../../../src/common/padding";
import type { MarginSize } from "../../../src/common/margin";
import type { RoundedSize } from "../../../src/common/rounded";
import type { BorderSize, BorderColor } from "../../../src/common/border";

/**
 * Container 组件的基础属性接口（与框架无关）
 */
export interface IContainerPropsBase {
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
     * 边框尺寸
     * @default "none"
     */
    border?: BorderSize;

    /**
     * 边框颜色，支持所有预定义的颜色和透明度变体
     */
    borderColor?: BorderColor;

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
     * 容器高度，不设置则不设置高度
     */
    height?: HeightSize;

    /**
     * flex项目水平对齐方式
     */
    items?: FlexAlign;

    /**
     * flex项目垂直对齐方式
     */
    justify?: FlexJustify;

    /**
     * 外边距大小
     * @default "none"
     */
    margin?: MarginSize;

    /**
     * 内边距大小
     * @default "md"
     */
    padding?: PaddingSize;

    /**
     * 垂直内边距（上下）
     */
    py?: PaddingSize;

    /**
     * 顶部内边距
     */
    pt?: PaddingSize;

    /**
     * 底部内边距
     */
    pb?: PaddingSize;

    /**
     * 水平内边距（左右）
     */
    px?: PaddingSize;

    /**
     * 左侧内边距
     */
    pl?: PaddingSize;

    /**
     * 右侧内边距
     */
    pr?: PaddingSize;

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
