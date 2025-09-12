/**
 * 布局相关类型定义和类名映射
 * 包含 Flex 布局和其他布局相关的属性类型和对应的 CSS 类名映射
 */

// Flex 布局方向
export type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse';

// Flex 间距类型
export type GapSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Flex 对齐方式
export type FlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

// Flex 分布方式
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

// Flex 方向类名映射
export const flexClasses: Record<FlexDirection, string> = {
    row: 'cosy:flex cosy:flex-row',
    col: 'cosy:flex cosy:flex-col',
    'row-reverse': 'cosy:flex cosy:flex-row-reverse',
    'col-reverse': 'cosy:flex cosy:flex-col-reverse',
} as const;

// Flex 间距类名映射
export const gapClasses: Record<GapSize, string> = {
    none: 'cosy:gap-0',
    xs: 'cosy:gap-1',
    sm: 'cosy:gap-2',
    md: 'cosy:gap-4',
    lg: 'cosy:gap-6',
    xl: 'cosy:gap-8',
} as const;

// Flex 对齐类名映射
export const itemsClasses: Record<FlexAlign, string> = {
    start: 'cosy:items-start',
    end: 'cosy:items-end',
    center: 'cosy:items-center',
    baseline: 'cosy:items-baseline',
    stretch: 'cosy:items-stretch',
} as const;

// Flex 分布类名映射
export const justifyClasses: Record<FlexJustify, string> = {
    start: 'cosy:justify-start',
    end: 'cosy:justify-end',
    center: 'cosy:justify-center',
    between: 'cosy:justify-between',
    around: 'cosy:justify-around',
    evenly: 'cosy:justify-evenly',
} as const;
