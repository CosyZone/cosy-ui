/**
 * 外边距相关类型定义和类名映射
 * 包含外边距属性类型和对应的 CSS 类名映射
 */

// 外边距类型
export type MarginSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

// 外边距类名映射
export const marginClasses: Record<MarginSize, string> = {
    none: '',
    xs: 'cosy:my-1',
    sm: 'cosy:my-2',
    md: 'cosy:my-4',
    lg: 'cosy:my-6',
    xl: 'cosy:my-8',
    '2xl': 'cosy:my-12',
    '3xl': 'cosy:my-16',
    '4xl': 'cosy:my-20',
    '5xl': 'cosy:my-24',
    '6xl': 'cosy:my-32',
} as const;
