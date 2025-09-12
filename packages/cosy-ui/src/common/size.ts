/**
 * 尺寸相关类型定义和类名映射
 * 包含各种组件共享的尺寸属性类型和对应的 CSS 类名映射
 */

// 尺寸类型
export type Size = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';

// 宽度类名映射
export const widthClasses: Record<Size, string> = {
    none: '',
    xs: 'cosy:max-w-xs',
    sm: 'cosy:max-w-sm',
    md: 'cosy:max-w-2xl',
    lg: 'cosy:max-w-4xl',
    xl: 'cosy:max-w-6xl',
    '2xl': 'cosy:max-w-7xl',
    '3xl': 'cosy:max-w-8xl',
    '4xl': 'cosy:max-w-9xl',
    '5xl': 'cosy:max-w-10xl',
    '6xl': 'cosy:max-w-11xl',
    full: 'cosy:w-full',
} as const;
