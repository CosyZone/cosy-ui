/**
 * 遮罩相关类型定义和类名映射
 * 包含各种遮罩形状的类型定义和对应的 CSS 类名映射
 */

// 遮罩类型
export type MaskType =
    | 'circle'
    | 'decagon'
    | 'diamond'
    | 'heart'
    | 'hexagon'
    | 'hexagon-2'
    | 'none'
    | 'pentagon'
    | 'square'
    | 'squircle'
    | 'star'
    | 'star-2'
    | 'triangle'
    | 'triangle-2'
    | 'triangle-3'
    | 'triangle-4';

// 遮罩类名映射
export const maskClasses: Record<MaskType, string> = {
    circle: 'cosy:mask cosy:mask-circle',
    decagon: 'cosy:mask cosy:mask-decagon',
    diamond: 'cosy:mask cosy:mask-diamond',
    heart: 'cosy:mask cosy:mask-heart',
    hexagon: 'cosy:mask cosy:mask-hexagon',
    'hexagon-2': 'cosy:mask cosy:mask-hexagon-2',
    none: '',
    pentagon: 'cosy:mask cosy:mask-pentagon',
    square: 'cosy:mask cosy:mask-square',
    squircle: 'cosy:mask cosy:mask-squircle',
    star: 'cosy:mask cosy:mask-star',
    'star-2': 'cosy:mask cosy:mask-star-2',
    triangle: 'cosy:mask cosy:mask-triangle',
    'triangle-2': 'cosy:mask cosy:mask-triangle-2',
    'triangle-3': 'cosy:mask cosy:mask-triangle-3',
    'triangle-4': 'cosy:mask cosy:mask-triangle-4',
} as const;
