/**
 * 圆角相关类型定义和类名映射
 * 包含各种圆角尺寸的类型定义和对应的 CSS 类名映射
 */

// 圆角类型
export type RoundedSize = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

// 圆角类名映射
export const roundedClasses: Record<RoundedSize, string> = {
    none: '',
    sm: 'cosy:rounded-sm',
    md: 'cosy:rounded-md',
    lg: 'cosy:rounded-lg',
    xl: 'cosy:rounded-xl',
    '2xl': 'cosy:rounded-2xl',
    '3xl': 'cosy:rounded-3xl',
    full: 'cosy:rounded-full',
} as const;
