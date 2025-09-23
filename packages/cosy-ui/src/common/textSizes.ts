/**
 * 文本与标题字号类名映射
 */
export const textSizeClasses = {
    xs: 'cosy:text-xs',
    sm: 'cosy:text-sm',
    md: 'cosy:text-base',
    lg: 'cosy:text-lg',
    xl: 'cosy:text-xl',
} as const;

export type TextSize = keyof typeof textSizeClasses;

export const headingSizeClasses = {
    1: 'cosy:text-4xl',
    2: 'cosy:text-3xl',
    3: 'cosy:text-2xl',
    4: 'cosy:text-xl',
    5: 'cosy:text-lg',
    6: 'cosy:text-base',
} as const;


