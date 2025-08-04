import type { HTMLAttributes } from 'astro/types';

type GapSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type ResponsiveValue<T> =
    | T
    | {
        base?: T;
        sm?: T;
        md?: T;
        lg?: T;
        xl?: T;
        '2xl'?: T;
    };

export interface GridProps extends HTMLAttributes<'div'> {
    /**
     * 网格列数，可以是固定值或响应式对象
     * @default 1
     */
    cols?: ResponsiveValue<number>;

    /**
     * 网格间距
     * @default "md"
     */
    gap?: GapSize;

    /**
     * 行间距，默认与gap相同
     */
    rowGap?: GapSize;

    /**
     * 列间距，默认与gap相同
     */
    colGap?: GapSize;

    /**
     * 垂直外边距
     */
    marginY?: GapSize;

    /**
     * 是否显示边框
     */
    border?: boolean;

    /**
     * 自定义类名
     */
    class?: string;

    /**
     * 类名列表
     */
    'class:list'?: any;
} 
