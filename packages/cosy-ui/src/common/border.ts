/**
 * 边框相关类型定义和类名映射
 * 包含各种边框尺寸的类型定义和对应的 CSS 类名映射
 */

// 边框类型
export type BorderSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';

// 边框类名映射
export const borderClasses: Record<BorderSize, string> = {
    none: '',
    sm: 'cosy:border cosy:border-base-300',
    md: 'cosy:border-2 cosy:border-base-300',
    lg: 'cosy:border-4 cosy:border-base-300',
    xl: 'cosy:border-8 cosy:border-base-300',
} as const;
