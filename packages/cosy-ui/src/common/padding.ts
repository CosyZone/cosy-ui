/**
 * 内边距相关类型定义和类名映射
 * 包含内边距属性类型和对应的 CSS 类名映射
 */

// 内边距类型
export type PaddingSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

// 内边距类名映射
export const paddingClasses: Record<PaddingSize, string> = {
    none: 'cosy:p-0',
    xs: 'cosy:p-1',
    sm: 'cosy:p-2',
    md: 'cosy:p-4',
    lg: 'cosy:p-6',
    xl: 'cosy:p-8',
    '2xl': 'cosy:p-10',
    '3xl': 'cosy:p-12',
    '4xl': 'cosy:p-16',
    '5xl': 'cosy:p-20',
} as const;
