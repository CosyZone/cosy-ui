/**
 * 悬停效果相关类型定义和类名映射
 * 包含各种悬停效果的类型定义和对应的 CSS 类名映射
 */

// 悬停效果类型
export type HoverEffect = 'none' | 'scale' | 'brightness' | 'blur';

// 悬停效果类名映射
export const hoverClasses: Record<HoverEffect, string> = {
    none: '',
    scale: 'cosy:hover:scale-105 cosy:transition-transform cosy:duration-200',
    brightness: 'cosy:hover:brightness-110 cosy:transition-all cosy:duration-200',
    blur: 'cosy:hover:backdrop-blur-sm cosy:transition-all cosy:duration-200',
} as const;
