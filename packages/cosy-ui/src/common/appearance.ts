/**
 * 外观相关类型定义和类名映射
 * 包含圆角、适配模式等外观相关的属性类型和对应的 CSS 类名映射
 */

// 圆角类型
export type RoundedSize = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

// 内容适配模式
export type FitMode = 'none' | 'contain' | 'cover';

// 圆角类名映射
export const roundedClasses: Record<RoundedSize, string> = {
    none: '',
    sm: 'cosy:rounded-sm',
    md: 'cosy:rounded-md',
    lg: 'cosy:rounded-lg',
    xl: 'cosy:rounded-xl',
    full: 'cosy:rounded-full',
} as const;
