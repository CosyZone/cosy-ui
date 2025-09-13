/**
 * 阴影相关类型定义和类名映射
 * 包含各种阴影尺寸的类型定义和对应的 CSS 类名映射
 */

// 阴影类型
export type ShadowSize = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// 阴影类名映射
export const shadowClasses: Record<ShadowSize, string> = {
    none: '',
    sm: 'cosy:shadow-sm',
    md: 'cosy:shadow-md',
    lg: 'cosy:shadow-lg',
    xl: 'cosy:shadow-xl',
    '2xl': 'cosy:shadow-2xl',
} as const;
