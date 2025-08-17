import type { BackgroundColor } from './backgrounds';

/**
 * Container 组件的属性接口
 */
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
    flex?: 'row' | 'col' | 'row-reverse' | 'col-reverse';

    /**
     * flex项目间距
     * @default "none"
     */
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

    /**
     * flex项目水平对齐方式
     */
    items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';

    /**
     * flex项目垂直对齐方式
     */
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

    /**
     * 内边距大小
     * @default "md"
     */
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

    /**
     * 容器尺寸
     * @default "md"
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

    /**
     * 圆角大小
     * @default "none"
     */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

    /**
     * 预设的语义化背景色，支持 DaisyUI 主题系统
     * 包含透明度设置，使用 Tailwind v4 语法：bg-color/opacity
     * @default undefined
     */
    background?: BackgroundColor;
}
