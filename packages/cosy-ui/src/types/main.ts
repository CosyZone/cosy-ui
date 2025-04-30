export interface MainContentProps {
    /**
     * 容器大小
     * @default "md"
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

    /**
     * 水平内边距（通过 Container 组件的 padding 属性设置）
     * @default "md"
     */
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

    /**
     * 垂直内边距
     * @default "md"
     */
    verticalPadding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | string;

    /**
     * 是否居中显示内容
     * @default true
     */
    centered?: boolean;

    /**
     * 背景颜色
     * @default undefined
     */
    backgroundColor?: 'primary' | 'secondary' | 'tertiary' | 'light' | 'dark' | string;

    /**
     * HTML id 属性
     */
    id?: string;

    /**
     * 类名
     */
    class?: string;

    /**
     * 类名列表
     */
    'class:list'?: any;
}